import {Avatar} from "./Avatar";

const EditableAvatar = ({ src, onUpload }) => {
  const handleChange = async (e) => {
    const file = e.target.files[0];
    const newUrl = await uploadAvatar(file);
    onUpload(newUrl);
  };

  return (
    <div className="relative">
      <Avatar src={src} size="xl" />
      <input
        type="file"
        hidden
        id="avatar-upload"
        accept="image/*"
        onChange={handleChange}
      />
      <label 
        htmlFor="avatar-upload"
        className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow"
      >
        <Camera className="w-5 h-5" />
      </label>
    </div>
  );
}; 