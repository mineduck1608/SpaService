import { z } from 'zod'

export type BaseModalProps = {
  isOpen?: boolean
  rowData?: any
  onClose?: () => void
}

export type FieldConfig = {
  name: string
  label: string
  placeholder?: string
  type: string
  required?: boolean
  minLength?: number
  maxLength?: number
  readonly?: boolean
  options?: { value: string; label: string }[]
}

export const customerConfig = {
  updatefields: [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
      minLength: 8,
      placeholder: 'Enter new full name'
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      readonly: true
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
    {
      name: 'dateOfBirth',
      label: 'D.O.B',
      type: 'datetime-local',
      readonly: true
    }
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
      options: [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
      ],
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
  ]
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
      options: [
        { value: "Admin System", label: "Admin System" },
        { value: "Manager", label: "Manager" },
        { value: "Employee", label: "Employee" }
      ],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      placeholder: 'Select status',
      options: [
        { value: "Active", label: "Active" },
        { value: "Locked", label: "Locked" }
      ],  
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
  updatefields: [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      required: true,
      minLength: 8,
      placeholder: 'Enter new username',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      required: true,
      placeholder: 'Enter new password',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      readonly: true,
    },
    {
      name: 'roleId',
      label: 'Role ID',
      type: 'text',
      minLength: 10,
      required: true,
      placeholder: 'Enter new role ID'
    },
    {
      name: 'createdAt',
      label: 'Created At',
      type: 'datetime-local',
      readonly: true,
    },
    {
      name: 'updatedAt',
      label: 'Updated At',
      type: 'datetime-local',
      readonly: true,
    }
  ]
}


export const entityConfigMap: Record<string, any> = {
  Customer: customerConfig,
  Account: accountConfig,
  Employee: employeeConfig
}

export const generateZodSchema = (fields: FieldConfig[]) => {
  const schemaObject: Record<string, any> = {}

  fields.forEach((field) => {
    let fieldSchema = z.string()
    switch (field.type) {
      case 'password':
        fieldSchema = z.string().regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?])[A-Za-z\d!@#$%^&*()_\-+=<>?]{12,}$/,
          'Please enter a valid password'
        )
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