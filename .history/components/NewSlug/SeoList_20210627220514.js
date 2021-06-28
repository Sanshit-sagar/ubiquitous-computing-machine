import React from 'react';
import { Formik, Form, Field, FieldArray, getIn } from 'formik'
 
const ErrorMessage = ({ name }) => (
    <Field
      name={name}
      render={({ form }) => {
        const error = getIn(form.errors, name);
        const touch = getIn(form.touched, name);
        return touch && error ? error : null;
      }}
    />
  );
  
 
 export const FriendList = () => (
   <div>
     <h1>Friend List</h1>
     <Formik
       initialValues={{ friends: ['jared', 'ian', 'brent'] }}
       onSubmit={...}
       render={formikProps => (
         <FieldArray
           name="friends"
           component={MyDynamicForm}
         />
       )}
     />
   </div>
 );


 export const MyDynamicForm = ({
    move, swap, push, insert, unshift, pop, form
  }) => (
   <Form>
    {/**  whatever you need to do */}
   </Form>
  );
 