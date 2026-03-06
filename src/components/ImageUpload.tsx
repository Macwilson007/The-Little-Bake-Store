'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useCallback } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value
}) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);

    return (
        <CldUploadWidget
            onSuccess={handleUpload}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            options={{
                maxFiles: 1
            }}
        >
            {({ open }) => {
                return (
                    <div
                        onClick={() => open?.()}
                        className="image-upload-area"
                    >
                        <div className="upload-icon">📸</div>
                        <div className="upload-text">
                            {value ? 'Change Image' : 'Upload Product Image'}
                        </div>
                        {value && (
                            <div className="upload-preview">
                                <Image
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    src={value}
                                    alt="Product Preview"
                                />
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    );
}

export default ImageUpload;
