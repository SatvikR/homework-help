import React, { useState } from "react";
import styles from "../../../styles/form.module.css";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { signup } from "../../../util/signup";
import { save_token } from "../../../util/login";
import { useRouter } from "next/router";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  repeat: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

interface IFormValues {
  username: string;
  password: string;
  repeat: string;
}

const Signup: React.FC = () => {
  const initialValues: IFormValues = { username: "", password: "", repeat: "" };
  const [error, setError] = useState<string | null>();
  const router = useRouter();

  return (
    <div className="container">
      <div className={styles.form_root}>
        <h1>Signup</h1>
        {error && (
          <div className={styles.error}>
            <h3>{error}</h3>
          </div>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={async (values, actions) => {
            try {
              if (values.password !== values.repeat)
                return setError("Make sure that your passwords match");

              setError(null);
              const res = await signup(values.username, values.password);
              save_token(res);
              router.push("/", undefined, { shallow: true });
            } catch {
              actions.resetForm();
              setError("That user already exists");
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
            <label htmlFor="repeat">Repeat Password</label>
            <Field
              id="repeat"
              name="repeat"
              placeholder="ex. p@ssw0rd123"
              type="password"
              required
              className={styles.form_field}
            />
            <button type="submit" className={styles.submit}>
              Submit
            </button>
          </Form>
        </Formik>{" "}
        <small>
          <p style={{ fontSize: "16px" }}>
            Already have an account? Login
            <Link href="/account">
              <a className="link"> Here</a>
            </Link>
          </p>
        </small>
      </div>
    </div>
  );
};

export default Signup;
