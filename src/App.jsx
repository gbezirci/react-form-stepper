import {ErrorMessage, Field, Form, Formik} from 'formik';
import {stepperValidation} from './validations/stepper-validation';
import classNames from 'classnames';

function App() {
  const steps = [
    {
      title: 'Kişisel Bilgiler',
      step: 1,
    },
    {
      title: 'İş & Yaş',
      step: 2,
    },
    {
      title: 'Hakkında',
      step: 3,
    },
  ];

  return (
    <div>
      <Formik
        validationSchema={stepperValidation}
        initialValues={{step: 1, laststep: 3, name: '', surname: '', age: '', job: '', about: ''}}
        onSubmit={(values, actions) => {
          console.log(values, actions);
        }}
      >
        {({values, setFieldValue, isValid, dirty}) => {
          const nextHandle = () => {
            setFieldValue('step', values.step + 1);
          };

          const prevHandle = () => {
            setFieldValue('step', values.step - 1);
          };

          const stepHandle = (step) => {
            setFieldValue('step', step);
          };

          return (
            <Form className="w-[500px] py-4 mx-auto">
              <header className="grid grid-cols-3 gap-x-2.5 border-b-2 border-zinc-400  mb-4">
                {steps.map((step) => (
                  <button key={step.step} type="button" onClick={() => stepHandle(step.step)} disabled={values.step < step.step} className="flex flex-col items-center justify-center py-2.5">
                    <div
                      className={classNames('w-10 h-10 mb-2.5 rounded-full flex items-center justify-center', {
                        'bg-blue-100 text-blue-600 font-bold': values.step === step.step,
                        'bg-green-100 text-green-600 font-bold': values.step > step.step,
                        'bg-zinc-100 text-zinc-700': values.step !== step.step,
                      })}
                    >
                      {values.step > step.step ? '✔️' : step.step}
                    </div>
                    <div className="text-xs text-zinc-700">{step.title}</div>
                  </button>
                ))}
              </header>
              {/* <header className="mb-4">
                <h3 className="text-lg font-medium text-zinc-700">Step {values.step}</h3>
              </header> */}

              {values.step == 1 && (
                <div className="grid gap-2.5">
                  <div>
                    <Field name="name" placeholder="Name" className="input" />
                    <ErrorMessage name="name" component="small" className="block text-xs text-red-600 mt-1" />
                  </div>
                  <div>
                    <Field name="surname" placeholder="Surname" className="input" />
                    <ErrorMessage name="surname" component="small" className="block text-xs text-red-600 mt-1" />
                  </div>
                </div>
              )}

              {values.step == 2 && (
                <div className="grid gap-2.5">
                  <div>
                    <Field name="age" placeholder="Age" className="input" />
                    <ErrorMessage name="age" component="small" className="block text-xs text-red-600 mt-1" />
                  </div>
                  <div>
                    <Field name="job" placeholder="Job" className="input" />
                    <ErrorMessage name="job" component="small" className="block text-xs text-red-600 mt-1" />
                  </div>
                </div>
              )}

              {values.step == 3 && (
                <div className="grid gap-2.5">
                  <div>
                    <Field name="about" placeholder="About" className="textarea" component="textarea" />
                    <ErrorMessage name="about" component="small" className="block text-xs text-red-600 mt-1" />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-x-4 mt-4">
                {(values.step > 1 && (
                  <button className="button" onClick={prevHandle} type="button">
                    Prev
                  </button>
                )) || <div />}
                {values.step !== values.laststep && (
                  <button className="button" onClick={nextHandle} type="button" disabled={!isValid || !dirty}>
                    Next
                  </button>
                )}
                {values.step === values.laststep && (
                  <button className="button" type="submit" disabled={!isValid || !dirty}>
                    Submit
                  </button>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default App;
