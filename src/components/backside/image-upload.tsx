'use client';

import { useState } from 'react';
import Dropzone from 'react-dropzone'; // 引入 Dropzone 組件
import { Button } from '@/components/ui/button';
import { X, Upload } from 'lucide-react';
import { useUploadThing } from '@/utils/uploadthing';
import { toast } from 'sonner';
import Image from 'next/image';
interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string[]) => void; // 修改为接收字符串数组
  onRemove: (url: string) => void; // 修改为接收要删除的 URL
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ disabled, onChange, onRemove, value }) => {
  const [files, setFiles] = useState<File[]>([]);

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: (res) => {
      if (res) {
        // 获取所有上传成功的图片 URL
        const uploadedUrls = res.map((file) => file.url);
        // 将新上传的 URL 添加到现有的 value 中
        onChange([...value, ...uploadedUrls]);
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
      <div className="mb-4 flex items-center gap-4 flex-wrap">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)} // 修改为传入要删除的 URL
                variant="destructive"
                size="sm"
                disabled={disabled || isUploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover w-full h-full" alt="Image" src={url} />
          </div>
        ))}
      </div>

      {/* 修改 Dropzone，允许多文件上传 */}
      <Dropzone
        disabled={disabled || isUploading}
        maxFiles={4} // 允许最多上传 4 张图片
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
                  <div className="flex items-center justify-center flex-col">
                    {files.map((file, index) => (
                      <p key={index} className="text-sm text-gray-600">
                        {file.name}
                      </p>
                    ))}
                    <Button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFiles([]);
                      }}
                      disabled={isUploading}
                      variant="ghost"
                      size="sm"
                      className="mt-2"
                    >
                      清除選擇
                    </Button>
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
    </div>
  );
};

export default ImageUpload;
