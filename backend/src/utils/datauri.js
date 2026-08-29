const getDataUri = (file) => {
   
    const b64 = Buffer.from(file.buffer).toString("base64");
    
    
    const dataURI = `data:${file.mimetype};base64,${b64}`;
    
    
    return { content: dataURI };
}

export default getDataUri;