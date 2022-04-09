class FileService {
    constructor() { }

    uploadFile = (file) => {
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = `/app/public/images/${fileName}`;
        file.mv(filePath);
        
        return fileName;
    }

}

module.exports = new FileService();