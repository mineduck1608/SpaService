import { z } from 'zod'

export type BaseModalProps = {
  type: 'Create' | 'Update'
  entity: string
  rowData?: any
}

export type BaseFormProps = {
  config: {
    entityName: string
    fields: FieldConfig[]
    updatefields: FieldConfig[]
    api: ApiConfig
  },
  type: 'Create' | 'Update',
  initialData?: Record<string, any>
}

export type FieldConfig = {
  name: string
  label: string
  placeholder?: string
  type: string
  required?: boolean
  minLength?: number
  maxLength?: number

}

export type ApiConfig = {
  create: string
  update: string
}

export const customerConfig = {
  entityName: 'Customer',
  updatefields: [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
      minLength: 8,
      placeholder: 'Enter new full name',
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'tel',
      required: true,
      placeholder: 'Enter new phone number'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'Enter new email address'
    },
  ],
  fields: [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      required: true,
      minLength: 4,
      placeholder: 'Enter username',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      required: true,
      placeholder: 'Enter password',
    },
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
      minLength: 8,
      placeholder: 'Enter full name',
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      required: true,
      placeholder: 'Select gender',
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'tel',
      required: true,
      placeholder: 'Enter phone number'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'Enter email address'
    },
    {
      name: 'dateOfBirth',
      label: 'D.O.B',
      type: 'datetime-local',
      required: true,
      placeholder: 'Select date of birth'
    }
  ],
  api: {
    create: 'api/accounts/RegisterCustomer',
    update: 'api/customers/Update/{id}'
  }
}

export const employeeConfig = {
  entityName: 'Employee',
  updatefields: [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Enter full name',
    },
    {
      name: 'position',
      label: 'Position',
      type: 'select',
      required: true,
      placeholder: 'Select position',  
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      placeholder: 'Select status',  
    },
    {
      name: 'image',
      label: 'Image',
      type: 'text',
      required: true,
      placeholder: 'Enter image URL',  
    },
    {
      name: 'accountId',
      label: 'Account ID',
      type: 'text',
      required: true,
      placeholder: 'Enter new account Id',  
    }
  ],
  fields: [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      required: true,
      minLength: 8,
      placeholder: 'Enter username',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      required: true,
      placeholder: 'Enter password',
    },
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Enter full name',
    },
    {
      name: 'position',
      label: 'Position',
      type: 'select',
      required: true,
      placeholder: 'Select position',  
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'tel',
      required: true,
      placeholder: 'Enter phone number'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'Enter email address'
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      placeholder: 'Select status',  
    },
    {
      name: 'hireDate',
      label: 'Hire Date',
      type: 'datetime-local',
      required: true,
    }
  ],
  api: {
    create: 'api/accounts/RegisterEmployee',
    update: 'api/employees/Update/{id}'
  }
}

export const accountConfig = {
  entityName: 'Account',
  fields: [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      required: true,
      minLength: 8,
      placeholder: 'Enter username',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      required: true,
      placeholder: 'Enter password',
    },
    {
      name: 'roleId',
      label: 'Role ID',
      type: 'text',
      required: true,
      placeholder: 'Enter role ID'
    }
  ],
  api: {
    update: 'api/accounts/Update/{id}'
  }
}


export const entityConfigMap: Record<string, any> = {
  Customer: customerConfig,
  Account: accountConfig,
  Employee: employeeConfig
}

export const generateZodSchema = (config: {entityName: string, fields: FieldConfig[]}) => {
  const schemaObject: Record<string, any> = {}
  config.fields.forEach((field) => {
    let fieldSchema = z.string()
    
    switch (field.type) {
      case 'password':
        fieldSchema = z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?])[A-Za-z\d!@#$%^&*()_\-+=<>?]{12,}$/, 'Please enter a valid password')
        break
      case 'tel':
        fieldSchema = z.string().regex(/^0[9832]\d{8}$/, 'Please enter a valid phone number')
        break
      case 'email':
        fieldSchema = z.string().email('Please enter a valid email')
        break
      default:
        fieldSchema = z.string()
        if (field.minLength) fieldSchema = fieldSchema.min(field.minLength, `Must be at least ${field.minLength} characters`)
        if (field.maxLength) fieldSchema = fieldSchema.max(field.maxLength, `Must be less than ${field.maxLength} characters`)
          
    }
    schemaObject[field.name] = field.required ? fieldSchema : fieldSchema.optional()
  })
  return z.object(schemaObject)
}