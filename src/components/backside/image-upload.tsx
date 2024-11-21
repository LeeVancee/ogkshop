'use client';

import { useState } from 'react';
import Dropzone from 'react-dropzone'; // 引入 Dropzone 組件
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { X, Upload } from 'lucide-react';
import { useUploadThing } from '@/utils/uploadthing';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: () => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ disabled, onChange, onRemove, value }) => {
  const [files, setFiles] = useState<File[]>([]);

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: (res) => {
      if (res?.[0]?.url) {
        onChange(res[0].url);
        setFiles([]);
        toast.success('圖片上傳成功');
      }
    },
    onUploadError: (error) => {
      toast.error(`上傳失敗: ${error.message}`);
    },
  });

  const handleUpload = () => {
    if (files.length > 0) {
      startUpload(files);
    }
  };

  return (
    <div>
      {/* 現有圖片預覽 */}
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove()}
                variant="destructive"
                size="sm"
                disabled={disabled || isUploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>

      {/* 只在沒有 value 時顯示拖放區域 */}
      {value.length === 0 && (
        <Dropzone
          disabled={disabled || isUploading}
          maxFiles={1}
          maxSize={5 * 1024 * 1024}
          accept={{
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
          }}
          onDrop={(acceptedFiles) => setFiles(acceptedFiles)}
        >
          {({ getRootProps, getInputProps, isDragActive, fileRejections }) => (
            <div className="space-y-4">
              <div
                {...getRootProps()}
                className={`
                  border-2 border-dashed border-gray-300 
                  p-8
                  h-[200px]
                  rounded-lg 
                  transition 
                  cursor-pointer
                  flex flex-col items-center justify-center
                  relative
                  ${isDragActive ? 'border-primary bg-primary/10' : 'hover:border-gray-400'}
                  ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
                  ${fileRejections.length > 0 ? 'border-red-500' : ''}
                `}
              >
                <input {...getInputProps()} />
                {files.length > 0 ? (
                  <div className="space-y-4 text-center">
                    <div className="flex items-center justify-center">
                      <p className="text-sm text-gray-600">
                        已選擇: {files[0].name}
                        <Button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFiles([]);
                          }}
                          disabled={isUploading}
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-auto p-1"
                        >
                          <X className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                        </Button>
                      </p>
                    </div>
                    <Button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpload();
                      }}
                      disabled={isUploading}
                      size="sm"
                    >
                      {isUploading ? (
                        '上傳中...'
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          確認上傳
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <p className="text-sm text-gray-600">
                      {isDragActive ? '放開以上傳文件' : '拖放圖片到這裡，或點擊選擇圖片'}
                    </p>
                    {fileRejections.length > 0 && <p className="text-sm text-red-500">文件格式不正確或超過大小限制</p>}
                    <p className="text-xs text-gray-400">支持的格式: JPG, PNG, GIF, WEBP (最大 5MB)</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </Dropzone>
      )}
    </div>
  );
};

export default ImageUpload;
