import React, { useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ImageUploadSection = ({ 
  images, 
  handleImageUpload, 
  removeImage, 
  setPrimaryImage 
}) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          handleImageUpload({
            id: Date.now() + Math.random(),
            url: e.target.result,
            name: file.name,
            isPrimary: images.length === 0
          });
        };
        reader.readAsDataURL(file);
      }
    });
    event.target.value = '';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Image" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Product Images</h2>
        </div>
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          iconName="Upload"
          iconPosition="left"
        >
          Upload Images
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {images.length === 0 ? (
        <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
          <Icon name="ImagePlus" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">No images uploaded yet</p>
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            iconName="Upload"
            iconPosition="left"
          >
            Upload First Image
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <div className="aspect-square overflow-hidden rounded-lg border border-border">
                <Image
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {image.isPrimary && (
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                  Primary
                </div>
              )}

              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-1">
                {!image.isPrimary && (
                  <button
                    onClick={() => setPrimaryImage(image.id)}
                    className="bg-secondary text-secondary-foreground p-1 rounded hover:bg-secondary/80 transition-colors"
                    title="Set as primary"
                  >
                    <Icon name="Star" size={14} />
                  </button>
                )}
                <button
                  onClick={() => removeImage(image.id)}
                  className="bg-destructive text-destructive-foreground p-1 rounded hover:bg-destructive/80 transition-colors"
                  title="Remove image"
                >
                  <Icon name="Trash2" size={14} />
                </button>
              </div>

              <p className="mt-2 text-xs text-muted-foreground truncate">
                {image.name}
              </p>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p>• The first image will be used as the primary product image</p>
              <p>• Click the star icon to set a different image as primary</p>
              <p>• Supported formats: JPG, PNG, GIF (max 5MB each)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadSection;