import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "../../styles/create.module.css";
import { Field, Form, Formik } from "formik";
import { Subject } from "../../types/subject";
import * as Yup from "yup";
import { uploadImage } from "../../util/uploadImage";
import { createQuestion } from "../../util/createQuestion";
import { useRouter } from "next/router";

const CreateSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  subject: Yup.string().required("Required"),
});

interface IFormValues {
  title: string;
  description: string;
  subject: Subject;
}

const subjects: Subject[] = [
  "computer science",
  "english",
  "history",
  "math",
  "science",
];

export const CreateQuestion: React.FC = () => {
  const initialValues: IFormValues = {
    title: "",
    description: "",
    subject: subjects[0],
  };

  const [image, setImage] = useState<File | null>();
  const [imageUrl, setImageUrl] = useState<string | null>();
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);

  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      setImage(file);

      reader.onload = () => {
        const _res = reader.result;
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  useEffect(() => {
    console.log(imageUrl);
  }, [imageUrl]);

  const handleUpload = () => {
    uploadImage(image)
      .then((res) => {
        setImageUrl(res?.data[0].location);
        setImage(null);
      })
      .then(() => setImageUploaded(true));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <h1>Ask a question</h1>
      {!imageUploaded ? (
        <>
          <h2>Image for your question (optional):</h2>
          <div {...getRootProps()} className={styles.file_drop}>
            <input {...getInputProps()} />
            <p>Drag and Drop Your Image</p>
          </div>
          {image && (
            <p className={styles.ready}>Your image is ready to upload!</p>
          )}
          <button className={styles.submit} onClick={() => handleUpload()}>
            Upload your image
          </button>
        </>
      ) : (
        <h2>Image Uploaded successfully</h2>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={CreateSchema}
        onSubmit={async (values, actions) => {
          const res = await createQuestion(
            values.title,
            values.description,
            values.subject,
            imageUrl
          );

          router.push("/", undefined, { shallow: true });
        }}
      >
        <Form>
          <label htmlFor="title" className={styles.label}>
            Title:
          </label>
          <Field
            id="title"
            name="title"
            placeholder="ex. How do I find the eccentricity of a hyperbola?"
            required
            className={styles.input}
          />
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <Field
            component="textarea"
            id="description"
            name="description"
            placeholder={
              "Describe your question in greater detail, and provide the neccesary information someone would need to answer your question"
            }
            required
            className={styles.textarea}
          />
          <Field
            as="select"
            id="subject"
            name="subject"
            className={styles.dropdown}
          >
            {subjects.map((e, i) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </Field>
          <br />
          <button type="submit" className={styles.submit}>
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};
