package com.team.cn.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.ws.ServiceMode;
import java.io.*;

/**
 * Created by pein on 2016/3/27.
 */
@Service
public class FileService {

    private static final String PATH = "F:/tmp/dynamic/";

    public String upload(MultipartFile imageFile) throws IOException {
        String name = imageFile.getOriginalFilename();
        String pathAll = new StringBuilder(PATH).append(name).toString();
        File nativePath = new File(PATH);
        if (!nativePath.exists()) {
            nativePath.mkdirs();
        }

        File nativeFile = new File(pathAll);
        if (!nativeFile.exists()) {
            nativeFile.createNewFile();
        }
        BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(new File(pathAll)));
        out.write(imageFile.getBytes());
        out.close();
        return pathAll;
    }


    public byte[] get(String imageUr) throws IOException {
        BufferedInputStream in = new BufferedInputStream(new FileInputStream(new File(imageUr)));
        byte[]  bytes= new byte[in.available()];
        in.read(bytes);
        in.close();
        return bytes;
    }

}
