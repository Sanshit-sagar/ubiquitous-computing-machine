import React from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';

const initialValues = {
  utmTags: [
    {
      name: '',
      value: '',
    },
  ],
};

const UpdateUtmTags = () => (
  <div className="w-full flex-col justify-start align-stretch">
    <h1>Add UTM Tags</h1>
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="utmTags">
            {({ insert, remove, push }) => (
              <div>
                {values.utmTags.length > 0 &&
                  values.utmTags.map((utmTag, index) => (
                    <div className="row" key={index}>
                      <div className="col">
                        <label htmlFor={`utmTags.${index}.name`}>Name</label>
                        <Badge color="pink"> 
                          {`teacher=${utmTags[index].name}`}
                        </Badge>
                        <Field
                          name={`utmTags.${index}.name`}
                          placeholder="Jane Doe"
                          type="text"
                        />
                        <ErrorMessage
                          name={`utmTags.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <label htmlFor={`utmTags.${index}.value`}>Value</label>
                        <Field
                          name={`utmTags.${index}.value`}
                          placeholder="ACME Campaign 2016"
                          type="text"
                        />
                        <ErrorMessage
                          name={`utmTags.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="secondary"
                  onClick={() => push({ name: '', value: '' })}
                >
                  Add Tags
                </button>
              </div>
            )}
          </FieldArray>
          <button type="submit"> Update </button>
        </Form>
      )}
    </Formik>
  </div>
);

 export default UpdateUtmTags
 
