import React from 'react';
import Box from 'ui-box';
import { Formik, Form, Field } from 'formik';
import {
  TextInputField, Textarea, SelectField, TextInput,
  FormField, Button, SelectMenu, SegmentedControl,
} from 'evergreen-ui';
import * as Yup from 'yup';

const truckSchema = Yup.object().shape({
  plate: Yup.string().required().matches(/^\d{2}[A-Z]-\d{4,5}$/, 'Truck plate is incorrect'),
  driver: Yup.string().required().min(2),
  type: Yup.string().required(),
  price: Yup.number().required().positive(),
  cargoTypes: Yup.array().required().of(Yup.string()),
  dimension: Yup.array().min(3).max(3).of(Yup.number().required().positive()),
  parkingAddress: Yup.string().required().max(200),
  description: Yup.string().required().max(500),
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
    const { children, initialValues, onSubmit } = this.props;
    return (
      <Formik initialValues={initialValues} onSubmit={values => onSubmit(truckSchema.cast(values))} validationSchema={truckSchema}>
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
                  <FormField label="Cargo Types" isRequired description="One or more cargo types">
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
              <FormField label="Dimension" isRequired description="Dimension of the truck" hint="In Length-Width-Height format">
                <Box display="flex" flexDirection="row" justifyContent="space-between">
                  <Field name="dimension[0]">
                    {({ field }) => (
                      <TextInput {...field} width="30%" height={24} />
                    )}
                  </Field>
                  <Field name="dimension[1]">
                    {({ field }) => (
                      <TextInput {...field} width="30%" height={24} />
                    )}
                  </Field>
                  <Field name="dimension[2]">
                    {({ field }) => (
                      <TextInput {...field} width="30%" height={24} />
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
                    hint={`${field.value.length}/200 characters`}
                    required
                    isInvalid={!!form.errors[field.name]}
                    validationMessage={form.errors[field.name]}
                  >
                    <Textarea lines={2} {...field} />
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
                    isInvalid={!!form.errors[field.name]}
                    validationMessage={form.errors[field.name]}
                  >
                    <Textarea lines={2} {...field} />
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
                  <FormField label="Status">
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
          {children}
        </Form>
      </Formik>
    );
  }
}

export default TruckEditor;
