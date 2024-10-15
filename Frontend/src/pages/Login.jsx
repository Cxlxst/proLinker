import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../context/userContext.jsx';

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      onSubmit={async (values) => {
        try {
          const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            data: values
          });
          console.log(values);
          if (response.status === 200 || response.status === 201) {
            const data = await response.json();
            login(data);
            navigate('/', { replace: true });
          }
        } catch (error) {
          console.log(error.message);
        }
      }}
      validationSchema={Yup.object({
        email: Yup.string().required('Required'),
        password: Yup.string().required('Required')
      })}>
      {({ isSubmitting }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="email">email:</label>
            <Field className="form-control" type="email" name="email" />
            <ErrorMessage style={{ color: 'red' }} name="email" component="div" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <Field className="form-control" type="password" name="password" />
            <ErrorMessage style={{ color: 'red' }} name="password" component="div" />
          </div>
          <button className="btn btn-primary mt-3" type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default Login;

// export default function Login(){
//     return(
//         <body>
//             <div className="container">
//                 <div className="column">
//                     <div>
//                         <label>E-mail</label>
//                         <input type="email"/>
//                     </div>

//                     <div>
//                         <label>Mot de passe</label>
//                         <input type="password"/>
//                     </div>
//                 </div>
//             </div>

//             <button>Connexion</button>
//         </body>
//     )
// }