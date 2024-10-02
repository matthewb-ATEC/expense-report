import { FC } from "react";
import { AttachmentType } from "../data/types";

interface AttachmentProps {
  attachment: AttachmentType;
}

const Attachment: FC<AttachmentProps> = ({ attachment }) => {
  return (
    <div className="flex justify-between items-center" key={attachment.id}>
      <div className="text-sm text-gray-500">{attachment.file?.name}</div>
    </div>
  );
};

export default Attachment;
