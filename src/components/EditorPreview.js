import DOMPurify from 'dompurify';

export const EditorPreview = ({ content }) => {
  const cleanHTML = DOMPurify.sanitize(content);
  
  return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
}; 