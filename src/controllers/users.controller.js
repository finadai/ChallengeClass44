const userDao = require('../daos/user.dao');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'profile') {
            cb(null, 'uploads/profiles');
        } else if (file.fieldname === 'product') {
            cb(null, 'uploads/products');
        } else {
            cb(null, 'uploads/documents');
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

exports.uploadDocuments = [
    upload.fields([
        { name: 'profile', maxCount: 1 },
        { name: 'product', maxCount: 1 },
        { name: 'document', maxCount: 10 }
    ]),
    async (req, res) => {
        try {
            const userId = req.params.uid;
            const user = await userDao.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            if (req.files['document']) {
                req.files['document'].forEach(file => {
                    user.documents.push({ name: file.fieldname, reference: file.path });
                });
            }

            await user.save();
            res.status(200).json({ message: 'Documentos subidos exitosamente' });
        } catch (error) {
            console.error('Error al subir documentos:', error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    }
];

exports.changeUserRole = async (req, res) => {
    const userId = req.params.uid;
    try {
        const user = await userDao.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (user.role === 'user') {
            const requiredDocuments = ['identificacion', 'comprobante_domicilio', 'comprobante_estado_cuenta'];
            const uploadedDocuments = user.documents.map(doc => doc.name);

            const hasAllDocuments = requiredDocuments.every(doc => uploadedDocuments.includes(doc));
            if (!hasAllDocuments) {
                return res.status(400).json({ message: 'No ha terminado de procesar su documentación' });
            }
        }

        user.role = user.role === 'user' ? 'premium' : 'user';
        await user.save();
        res.status(200).json({ message: 'Rol de usuario actualizado correctamente' });
    } catch (error) {
        console.error('Error al cambiar rol de usuario:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
