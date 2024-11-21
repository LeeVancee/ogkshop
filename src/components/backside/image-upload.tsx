'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ImagePlus, Trash } from 'lucide-react';
import { UploadDropzone } from '@/utils/uploadthing';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: () => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ disabled, onChange, onRemove, value }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button type="button" onClick={onRemove} variant="destructive" size="icon" disabled={disabled}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      {value.length === 0 && (
        <div>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              onChange(res?.[0]?.url);
              toast.success('图片上传成功');
            }}
            onUploadError={(error: Error) => {
              toast.error(`上传失败: ${error.message}`);
            }}
            appearance={{
              container: 'border-dashed border-2 border-gray-200 rounded-lg p-4',
              label: 'text-sm text-gray-600',
              allowedContent: 'text-xs text-gray-400',
              button: disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
