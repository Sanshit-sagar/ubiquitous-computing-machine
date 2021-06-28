import React from 'react';
import { Formik, Form, Field, FieldArray, getIn } from 'formik'

const MyDynamicForm = () => {
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

 export default MyDynamicForm
 
