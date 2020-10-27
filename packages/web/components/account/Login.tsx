import React, { useReducer, useState } from "react";
import styles from "../../styles/form.module.css";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { login, save_token } from "../../util/login";
import { useRouter } from "next/router";
import Link from "next/link";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

interface IFormValues {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const initialValues: IFormValues = { username: "", password: "" };
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      <div className={styles.form_root}>
        <h1>Login</h1>
        {error && (
          <div className={styles.error}>
            <h3>Either your username or password was incorrect</h3>
          </div>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={async (values, actions) => {
            try {
              const res = await login(values.username, values.password);
              save_token(res);
              setError(false);
              router.push("/", undefined, { shallow: true });
            } catch {
              actions.resetForm();
              setError(true);
            }
          }}
        >
          <Form className={styles.form}>
            <label htmlFor="username">Username</label>
            <Field
              id="username"
              name="username"
              placeholder="ex. username123"
              required
              className={styles.form_field}
            />
            <label htmlFor="password">Password</label>
            <Field
              id="password"
              name="password"
              placeholder="ex. p@ssw0rd123"
              type="password"
              required
              className={styles.form_field}
            />
            <button type="submit" className={styles.submit}>
              Submit
            </button>
          </Form>
        </Formik>
        <small>
          <p style={{ fontSize: "16px" }}>
            Don't have an account? Signup here
            <Link href="/account/signup">
              <a className="link"> Here</a>
            </Link>
          </p>
        </small>
      </div>
    </>
  );
};
