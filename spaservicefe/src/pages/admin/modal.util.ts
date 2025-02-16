export const customerConfig = {
  entityName: 'Customer',
  fields: [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
      minLength: 10,
      placeholder: 'Enter full name',
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
    }
  ],
  api: {
    create: 'api/customers/Create',
    update: 'api/customers/Update/{id}',
    delete: 'api/customers/Delete/{id}'
  }
}

export const appointmentConfig = {
  entityName: 'Appointment',
  fields: [
    {
      name: 'requestId',
      label: 'Request ID',
      type: 'text',
      required: true,
      placeholder: 'Enter request ID',
    },
    {
      name: 'employeeId',
      label: 'Employee ID',
      type: 'text',
      required: true,
      placeholder: 'Enter employee ID',
    },
    {
      name: 'startTime',
      label: 'Start Time',
      type: 'datetime-local',
      required: false,
    },
    {
      name: 'endTime',
      label: 'End Time',
      type: 'datetime-local',
      required: false,
    },
    {
      name: 'replacementEmployee',
      label: 'Replacement Employee',
      type: 'text',
      required: false,
      placeholder: 'Enter replacement employee ID',
    }
  ],
  api: {
    create: 'api/appointments/Create',
    update: 'api/appointments/Update/{id}',
    delete: 'api/appointments/Delete/{id}'
  }
}

export const employeeConfig = {
    entityName: 'Appointment',
    fields: [
        {
            name: 'requestId',
            label: 'Request ID',
            type: 'text',
            required: true,
            placeholder: 'Enter request ID',
        },
        {
            
        }
    ],
    api: {
        create: 'api/employees/Create',
        update: 'api/employees/Update/{id}',
        delete: 'api/employees/Delete/{id}'
    }
}

export const accountConfig = {
    entityName: 'Appointment',
    fields: [
        {
            name: 'requestId',
            label: 'Request ID',
            type: 'text',
            required: true,
            placeholder: 'Enter request ID',
        }
    ],
    api: {
        create: 'api/employees/Create',
        update: 'api/employees/Update/{id}',
        delete: 'api/employees/Delete/{id}'
    }
}

export const productConfig = {
    entityName: 'Appointment',
    fields: [
        {
            name: 'requestId',
            label: 'Request ID',
            type: 'text',
            required: true,
            placeholder: 'Enter request ID',
        }
    ],
    api: {
        create: 'api/employees/Create',
        update: 'api/employees/Update/{id}',
        delete: 'api/employees/Delete/{id}'
    }
}

export const applicationConfig = {
    entityName: 'Appointment',
    fields: [
        {
            name: 'requestId',
            label: 'Request ID',
            type: 'text',
            required: true,
            placeholder: 'Enter request ID',
        }
    ],
    api: {
        create: 'api/employees/Create',
        update: 'api/employees/Update/{id}',
        delete: 'api/employees/Delete/{id}'
    }
}

export const transactionConfig = {
    entityName: 'Appointment',
    fields: [
        {
            name: 'requestId',
            label: 'Request ID',
            type: 'text',
            required: true,
            placeholder: 'Enter request ID',
        }
    ],
    api: {
        create: 'api/employees/Create',
        update: 'api/employees/Update/{id}',
        delete: 'api/employees/Delete/{id}'
    }
}