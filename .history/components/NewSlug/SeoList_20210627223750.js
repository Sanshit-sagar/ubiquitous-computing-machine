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
  
 
//  export const FriendList = () => (
//    <div>
//      <h1>Friend List</h1>
//      <Formik
//        initialValues={{ friends: ['jared', 'ian', 'brent'] }}
//        onSubmit={...}
//        render={formikProps => (
//          <FieldArray
//            name="friends"
//            component={MyDynamicForm}
//          />
//        )}
//      />
//    </div>
//  );


 export const MyDynamicForm = ({ move, swap, push, insert, unshift, pop, form }) => {
    return (
        <Form>
        <FieldArray
          name="friends"
          render={arrayHelpers => (
            <div>
              {values.friends.map((friend, index) => (
                <div key={index}>
                  {/** both these conventions do the same */}
                  <Field name={`friends[${index}].name`} />
                  <Field name={`friends.${index}.age`} />
      
                  <button type="button" onClick={() => arrayHelpers.remove(index)}>
                    -
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => arrayHelpers.push({ name: '', age: '' })}
              >
                +
              </button>
            </div>
          )}
        />
      </Form>
     
    );   
 }
 