/**
 * @file Attachment.tsx - ./frontend/src/components
 * @description The `Attachment` component is responsible for displaying individual file attachment details, such as the file name. It is used within forms or other components that manage file uploads, providing a visual representation of an uploaded or selected file. This component is commonly rendered in a list of attachments, with each attachment showing its file name and relevant metadata from the `AttachmentType` object. The component is styled using basic flexbox utilities for layout alignment and ensures that file names are displayed in a consistent and readable format across the UI.
 * @author matthewb
 * @date Created: 2024-09-30 | Last Modified: 2024-10-02
 * @version 1.0.0
 * @license MIT
 * @usage Use this component to render a single attachment in a file upload list or form. For example:
 *        `<Attachment attachment={attachment} />`
 *        Where `attachment` is an object of type `AttachmentType` containing file information.
 * @dependencies React, `AttachmentType` from `../data/types`.
 * @relatedFiles This component is typically used alongside file upload components or in parent components that manage attachments, such as `FileUploader.tsx` or `ExpenseForm.tsx`.
 */

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
