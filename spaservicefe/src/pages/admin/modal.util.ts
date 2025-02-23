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
}

export const customerConfig = {
  updatefields: [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
      minLength: 8,
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      required: true,
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'tel',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
    {
      name: 'dateOfBirth',
      label: 'D.O.B',
      type: 'datetime-local',
      required: true,
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
      placeholder: 'Select position'
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      placeholder: 'Select status'
    },
    {
      name: 'image',
      label: 'Image',
      type: 'text',
      required: true,
      placeholder: 'Enter image URL',  
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
      name: 'image',
      label: 'Image',
      type: 'text',
      required: true,
      placeholder: 'Enter image URL',  
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
      readonly: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
    },
    {
      name: 'roleId',
      label: 'Role',
      type: 'select',
      required: true,
    }
  ]
}

export const categoriesConfig = {
  updatefields: [
    {
      name: 'categoryName',
      label: 'Category Name',
      type: 'text',
      required: true,
      minLength: 3,
      placeholder: 'Enter new name',
    },
    {
      name: 'categoryDescription',
      label: 'Status',
      type: 'text',
      required: true,
      placeholder: 'Enter new description',
    }
  ],
  fields: [
    {
      name: 'categoryName',
      label: 'Category Name',
      type: 'text',
      required: true,
      minLength: 5,
      placeholder: 'Enter category name',
    },
    {
      name: 'categoryDescription',
      label: 'Description',
      type: 'text',
      required: true,
      placeholder: 'Enter category description',
    }
  ]
}

export const applicatonConfig = {
  updatefields: [
    {
      name: 'status',
      label: 'Status',
      type: 'text',
      required: true,
      minLength: 4,
      placeholder: 'Enter status',
    },
    {
      name: 'content',
      label: 'Content',
      type: 'text',
      required: true,
      minLength: 4,
      placeholder: 'Enter content',
    },
    {
      name: 'accountId',
      label: 'Account Id',
      type: 'text',
      required: true,
      minLength: 4,
      placeholder: 'Enter account Id',
    },
    {
      name: 'resolvedBy',
      label: 'Resolved By',
      type: 'text',
      required: true,
      placeholder: 'Enter employee name',
    }
  ]
}

export const newsConfig = {
  updatefields: [
    {
      name: 'header',
      label: 'Header',
      type: 'text',
      required: true,
      minLength: 5,
      placeholder: 'Enter new header',
    },
    {
      name: 'content',
      label: 'Content',
      type: 'text',
      required: true,
      placeholder: 'Enter new content',
    },
    {
      name: 'type',
      label: 'Type',
      type: 'text',
      required: true,
      placeholder: 'Enter new type',
    },
    {
      name: 'image',
      label: 'Image URL',
      type: 'text',
      placeholder: 'Enter new image URL',
    },
    {
      name: 'categoryId',
      label: 'Category Id',
      type: 'text',
      required: true,
      placeholder: 'Enter new category Id',
    }
  ],
  fields: [
    {
      name: 'header',
      label: 'Header',
      type: 'text',
      required: true,
      minLength: 5,
      placeholder: 'Enter new header',
    },
    {
      name: 'content',
      label: 'Content',
      type: 'text',
      required: true,
      placeholder: 'Enter new content',
    },
    {
      name: 'type',
      label: 'Type',
      type: 'text',
      required: true,
      placeholder: 'Enter new type',
    },
    {
      name: 'image',
      label: 'Image URL',
      type: 'text',
      placeholder: 'Enter new image URL',
    },
    {
      name: 'categoryId',
      label: 'Category Id',
      type: 'text',
      required: true,
      placeholder: 'Enter category Id',
    }
  ]
}

export const spaServiceConfig = {
  updatefields: [
    {
      name: 'serviceName',
      label: 'Service Name',
      type: 'text',
      required: true,
      minLength: 6,
      placeholder: 'Enter new service name',
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      required: true,
      step: '0.01',
      min: 0,
      placeholder: 'Enter new price',
    },
    {
      name: 'duration',
      label: 'Duration',
      type: 'text',
      required: true,
      placeholder: 'Enter new duration',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      placeholder: 'Enter new description',
    },
    {
      name: 'serviceImage',
      label: 'Service Image',
      type: 'text',
      placeholder: 'Enter new service image',
    },
    {
      name: 'categoryId',
      label: 'CategoryId',
      type: 'text',
      placeholder: 'Enter new category ID',
    }
  ],
  fields: [
    {
      name: 'serviceName',
      label: 'Service Name',
      type: 'text',
      required: true,
      minLength: 6,
      placeholder: 'Enter new service name',
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      required: true,
      step: '0.01',
      min: 0,
      placeholder: 'Enter new price',
    },
    {
      name: 'duration',
      label: 'Duration',
      type: 'text',
      required: true,
      placeholder: 'Enter new duration',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      placeholder: 'Enter new description',
    },
    {
      name: 'serviceImage',
      label: 'Service Image',
      type: 'text',
      placeholder: 'Enter new service image',
    },
    {
      name: 'categoryId',
      label: 'CategoryId',
      type: 'text',
      placeholder: 'Enter new category ID',
    }
  ]
}

export const promotionConfig = {
  updatefields: [
    {
      name: 'promotionCode',
      label: 'Promotion Code',
      type: 'text',
      required: true,
      minLength: 5,
      placeholder: 'Enter new promotion code',
    },
    {
      name: 'promotionName',
      label: 'Promotion Name',
      type: 'text',
      required: true,
      minLength: 4,
      placeholder: 'Enter new promotion name',
    },
    {
      name: 'discountValue',
      label: 'Discount Value',
      type: 'number',
      required: true,
      step: '0.01',
      min: 0,
      placeholder: 'Enter new discount value',
    },
    {
      name: 'isActive',
      label: 'Status',
      type: 'select',
      placeholder: 'Select status',
    }
  ],
  fields: [
    {
      name: 'promotionCode',
      label: 'Promotion Code',
      type: 'text',
      required: true,
      minLength: 5,
      placeholder: 'Enter promotion code',
    },
    {
      name: 'promotionName',
      label: 'Promotion Name',
      type: 'text',
      required: true,
      minLength: 4,
      placeholder: 'Enter promotion name',
    },
    {
      name: 'discountValue',
      label: 'Discount Value',
      type: 'number',
      required: true,
      step: '0.01',
      min: 0,
      placeholder: 'Enter discount value',
    },
    {
      name: 'isActive',
      label: 'Status',
      type: 'select',
      placeholder: 'Select status',
    }
  ]
}

export const transactionConfig = {
  updatefields: [
    {
      name: 'transactionType',
      label: 'Transaction Type',
      type: 'text',
      required: true,
      placeholder: 'Enter new type',
    },
    {
      name: 'totalPrice',
      label: 'Total Price',
      type: 'number',
      required: true,
      step: '0.01',
      min: 0,
      placeholder: 'Enter new total price',
    },
    {
      name: 'completeTime',
      label: 'Complete Time',
      type: 'datetime-local',
      readonly: true
    },
    {
      name: 'paymentType',
      label: 'Payment Type',
      type: 'text',
      readonly: true
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      placeholder: 'Select status',
    }
  ]
}

export const orderConfig = {
  updatefields: [
    {
      name: 'customerId',
      label: 'Customer Id',
      type: 'text',
      required: true,
      placeholder: 'Enter customer Id',
    },
    {
      name: 'orderDate',
      label: 'Order Date',
      type: 'datetime-local',
      required: true,
    },
    {
      name: 'totalAmount',
      label: 'Total Amount',
      type: 'number',
      required: true,
      step: '0.01',
      min: 0,
      placeholder: 'Enter total amount',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      placeholder: 'Select status',
    },
    {
      name: 'transactionId',
      label: 'Transaction Id',
      type: 'text',
      required: true,
      placeholder: 'Enter transaction Id',
    }
  ]
}

export const cosmeticProductConfig = {
  updatefields: [
    {
      name: 'productId',
      label: 'Product Id',
      type: 'text',
      required: true,
      placeholder: 'Enter product Id',
    },
    {
      name: 'productName',
      label: 'Product Name',
      type: 'text',
      required: true,
      placeholder: 'Enter product name',
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      required: true,
      step: '0.01',
      min: 0,
      placeholder: 'Enter price',
    },
    {
      name: 'quantity',
      label: 'Quantity',
      type: 'number',
      required: true,
      min: 0,
      placeholder: 'Enter quantity',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      required: true,
      minLength: 5,
      placeholder: 'Enter description',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      placeholder: 'Select status',
    },
    {
      name: 'isSelling',
      label: 'Is Selling',
      type: 'select',
      placeholder: 'Select an option',
    },
    {
      name: 'image',
      label: 'Image URL',
      type: 'text',
      required: true,
      placeholder: 'Enter image URL',
    }
  ]
}

export const generateZodSchema = (fields: FieldConfig[]) => {
  const schemaObject: Record<string, any> = {}

  fields.forEach((field) => {
    let fieldSchema: any = z.any()
    switch (field.type) {
      case 'password':
        fieldSchema = z.string().regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?])[A-Za-z\d!@#$%^&*()_\-+=<>?]{12,}$/,
          'Please enter a valid password.'
        )
        break
      case 'tel':
        fieldSchema = z.string().regex(/^0[9832]\d{8}$/, 'Please enter a valid phone number.')
        break
      case 'email':
        fieldSchema = z.string().email('Please enter a valid email.')
        break
      default:
        fieldSchema = z.string()
        if (field.minLength) fieldSchema = fieldSchema.min(field.minLength, `Must be at least ${field.minLength} characters.`)
        if (field.maxLength) fieldSchema = fieldSchema.max(field.maxLength, `Must be less than ${field.maxLength} characters.`)
    }

    schemaObject[field.name] = field.required ? fieldSchema : fieldSchema.optional()
  })
  return z.object(schemaObject)
}