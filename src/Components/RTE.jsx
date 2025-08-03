import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full mb-6">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2 pl-1">
          {label}
        </label>
      )}

      <div className="overflow-hidden rounded-xl shadow-sm border border-gray-300">
        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              apiKey="4iq1q2wyxjss9uycnussdr0wpsajiukuzkdq2xh00b9b4x6a"
              init={{
                initialValue: defaultValue,
                height: 400,
                menubar: true,
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "charmap",
                  "preview",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                  "codesample",
                  "anchor"
                ],
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | codesample | code",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; padding: 10px; }",
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </div>
  );
}
