import React from 'react';
import Box from 'ui-box';
import { Formik, Form, Field } from 'formik';
import {
  TextInputField, Textarea, SelectField, TextInput,
  FormField, Button, SelectMenu, SegmentedControl,
} from 'evergreen-ui';
import * as Yup from 'yup';

const truckSchema = Yup.object().shape({
  plate: Yup.string().label('Truck plate').required().matches(/^\d{2}[A-Z]-\d{4,5}$/, 'Truck plate is incorrect'),
  driver: Yup.string().label('Driver').required().min(2),
  type: Yup.string().label('Truck type').required(),
  price: Yup.number().label('Truck price').required().positive(),
  cargoTypes: Yup.array().label('Cargo types').required().of(Yup.string()),
  dimension: Yup.array().label('Dimension').min(3).max(3).of(Yup.number().required().positive()), // eslint-disable-line
  parkingAddress: Yup.string().label('Parking address').required().max(500),
  description: Yup.string().label('Description').required().max(200),
  productionYear: Yup.number().label('Production year').required().max(2020),
  status: Yup.string().label('Status').required(),
}).noUnknown();

const truckTypes = [5, 10, 15, 20].map(x => `${x} tons`);
const cargoTypes = ['Fish', 'Vegetable', 'Garbage'].map(x => ({ label: x, value: x }));
const truckStatuses = ['New', 'In-Use', 'Defunct'].map(x => ({ label: x, value: x }));

const labelMultiFor = function labelMultiFor(values) {
  if (values.length === 0) {
    return '';
  }
  if (values.length === 1) {
    return values[0];
  }
  if (values.length === 2) {
    return values.join(', ');
  }

  return `${values[0]} and ${values.length - 1} others`;
};

/* eslint-disable-next-line react/prefer-stateless-function */
class TruckEditor extends React.PureComponent {
  render() {
    const {
      initialValues, onSubmit,
    } = this.props;
    return (
      <Formik initialValues={initialValues} onSubmit={(values, options) => onSubmit(truckSchema.cast(values), options)} validationSchema={truckSchema}>
        <Form>
          <Box display="flex" flexDirection="row" flexWrap="wrap">
            <Box width="50%" padding={4}>
              <Field name="plate">
                {({ field, form }) => (
                  <TextInputField
                    {...field}
                    label="Truck Plate"
                    description="License plate of the truck"
                    hint="Must be either XXX-XXXX or XXX-XXXXX"
                    placeholder="35K-17461"
                    required
                    isInvalid={!!form.errors[field.name]}
                    validationMessage={form.errors[field.name]}
                  />
                )}
              </Field>
            </Box>
            <Box width="50%" padding={4}>
              <Field name="driver">
                {({ field, form }) => (
                  <TextInputField
                    {...field}
                    label="Driver"
                    description="Driver name of the truck"
                    placeholder="Nguyen Van A"
                    required
                    isInvalid={!!form.errors[field.name]}
                    validationMessage={form.errors[field.name]}
                  />
                )}
              </Field>
            </Box>
            <Box width="50%" padding={4}>
              <Field name="type">
                {({ field, form }) => (
                  <SelectField
                    {...field}
                    label="Truck Type"
                    description="Type of the truck"
                    placeholder="10 tons"
                    required
                    isInvalid={!!form.errors[field.name]}
                    validationMessage={form.errors[field.name]}
                  >
                    {truckTypes.map(type => (<option key={type} value={type}>{type}</option>))}
                  </SelectField>
                )}
              </Field>
            </Box>
            <Box width="50%" padding={4}>
              <Field name="price">
                {({ field, form }) => (
                  <TextInputField
                    {...field}
                    label="Price"
                    description="Truck price in VND"
                    required
                    isInvalid={!!form.errors[field.name]}
                    validationMessage={form.errors[field.name]}
                  />
                )}
              </Field>
            </Box>
            <Box width="50%" padding={4}>
              <Field name="cargoTypes">
                {({ field, form }) => (
                  <FormField
                    label="Cargo Types"
                    isRequired
                    description="One or more cargo types"
                    validationMessage={form.errors[field.name]}
                  >
                    <SelectMenu
                      isMultiSelect
                      title="Select cargo types"
                      options={cargoTypes}
                      selected={field.value}
                      onSelect={({ value }) => form.setFieldValue(field.name, field.value.concat(value))}
                      onDeselect={({ value }) => form.setFieldValue(field.name, field.value.filter(v => v !== value))}
                    >
                      <Button type="button">{labelMultiFor(field.value) || 'None selected'}</Button>
                    </SelectMenu>
                  </FormField>
                )}
              </Field>
            </Box>
            <Box width="50%" padding={4}>
              <FormField
                label="Dimension"
                isRequired
                description="Dimension of the truck"
                hint="In Length-Width-Height format"
              >
                <Box display="flex" flexDirection="row" justifyContent="space-between">
                  <Field name="dimension[0]">
                    {({ field, form }) => (
                      <TextInput {...field} width="30%" height={24} isInvalid={!!(form.errors.dimension && form.errors.dimension[0])} />
                    )}
                  </Field>
                  <Field name="dimension[1]">
                    {({ field, form }) => (
                      <TextInput {...field} width="30%" height={24} isInvalid={!!(form.errors.dimension && form.errors.dimension[1])} />
                    )}
                  </Field>
                  <Field name="dimension[2]">
                    {({ field, form }) => (
                      <TextInput {...field} width="30%" height={24} isInvalid={!!(form.errors.dimension && form.errors.dimension[2])} />
                    )}
                  </Field>
                </Box>
              </FormField>
            </Box>
            <Box width="100%" padding={4}>
              <Field name="parkingAddress">
                {({ field, form }) => (
                  <FormField
                    label="Parking address"
                    description="Parking address of the truck"
                    placeholder="17 Duy Tan st."
                    hint={`${field.value.length}/500 characters`}
                    required
                    validationMessage={form.errors[field.name]}
                  >
                    <Textarea lines={2} {...field} isInvalid={!!form.errors[field.name]} />
                  </FormField>
                )}
              </Field>
            </Box>
            <Box width="100%" padding={4}>
              <Field name="description">
                {({ field, form }) => (
                  <FormField
                    label="Description"
                    description="Some note about this truck"
                    placeholder="17 Duy Tan st."
                    hint={`${field.value.length}/200 characters`}
                    required
                    validationMessage={form.errors[field.name]}
                  >
                    <Textarea lines={2} {...field} isInvalid={!!form.errors[field.name]} />
                  </FormField>
                )}
              </Field>
            </Box>
            <Box width="50%" padding={4}>
              <Field name="productionYear">
                {({ field, form }) => (
                  <TextInputField
                    {...field}
                    label="Production Year"
                    required
                    isInvalid={!!form.errors[field.name]}
                    validationMessage={form.errors[field.name]}
                  />
                )}
              </Field>
            </Box>
            <Box width="50%" padding={4}>
              <Field name="status">
                {({ field, form }) => (
                  <FormField label="Status" validationMessage={form.errors[field.name]}>
                    <SegmentedControl
                      options={truckStatuses}
                      {...field}
                      onChange={val => form.setFieldValue(field.name, val)}
                    />
                  </FormField>
                )}
              </Field>
            </Box>
          </Box>
          <Box height={16} />
          <Field>
            {({ form }) => (
              <Box display="flex" flexDirection="row">
                <Box flex="1" />
                <Box justifySelf="end">
                  <Button intent="success" isLoading={form.isSubmitting} appearance="primary" type="submit">Create</Button>
                </Box>
              </Box>
            )}
          </Field>
        </Form>
      </Formik>
    );
  }
}

export default TruckEditor;
