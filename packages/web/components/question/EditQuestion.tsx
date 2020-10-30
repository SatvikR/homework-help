import React from "react";
import { Subject } from "../../types/subject";
import { getQueston } from "../../util/getQuestion";
import styles from "../../styles/create.module.css";
import { Field, Form, Formik } from "formik";
import { edit_question } from "../../util/editQuestion";
import { useRouter } from "next/router";

interface Props {
  id: string;
}

interface IFormValues {
  title: string;
  description: string;
  subject: string;
}

const subjects: Subject[] = [
  "computer science",
  "english",
  "history",
  "math",
  "science",
];

export const EditQuestion: React.FC<Props> = (props) => {
  const router = useRouter();

  const { data, error } = getQueston(props.id);

  if (error) return <h1>Failed to load</h1>;
  if (!data) return <h1>Loading...</h1>;

  const { title, description, subject, author, answered } = data.data.question;

  const initialVaues: IFormValues = {
    title: title,
    description: description,
    subject: subject,
  };

  return (
    <div>
      <h1>Edit your Question:</h1>
      <Formik
        initialValues={initialVaues}
        onSubmit={async (values, actions) => {
          const res = await edit_question(
            props.id,
            answered,
            author,
            values.subject as Subject,
            values.title,
            values.description
          );

          router.push("/account");
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
