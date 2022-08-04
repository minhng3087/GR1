import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import { Modal, DatePicker, Form, Input, Button, Select } from 'antd'
import moment from 'moment'
import { openCustomNotificationWithIcon } from '@/components/common/notification'
import calendarApi from '@/api/calendarApi'
import userApi from '@/api/userApi'
import styles from '@/pages/calendar/style.module.scss'
import { StatusTag } from '@/components/common/statusTag'
import { Sorter } from '@/utils/sorter'
import Table from '@/components/Table'
import { useAuth } from '@/hooks/auth'

export default function Calendar() {
  const { user } = useAuth({ middleware: 'auth' })

  const [events, setEvents] = useState([])
  const [dataTable, setDataTable] = useState([])
  const [eventEdit, setEventEdit] = useState(false)
  const [userAssigned, setUserAssigned] = useState([])

  const [eventId, setEventId] = useState()

  const [disabled, setDisabled] = useState(false)

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalTableVisible, setIsModalTableVisible] = useState(false)

  const dateFormat = 'YYYY-MM-DD HH:mm:ss'

  const priorities = [
    { value: 1, name: 'Low' },
    { value: 2, name: 'Medium' },
    { value: 3, name: 'High' },
  ]

  const filterPriorities = [
    { text: 'Low', value: 'Low' },
    { text: 'Medium', value: 'Medium' },
    { text: 'High', value: 'High' },
  ]

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: {
        compare: Sorter.NAME,
      },
      selectInput: true,
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      sorter: {
        compare: Sorter.DATE,
      },
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      sorter: {
        compare: Sorter.DATE,
      },
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      filters: filterPriorities,
      onFilter: (value, record) => record.priority.indexOf(value) === 0,
      render: (text, record) => <StatusTag status={record.priority} />,
    },
  ]

  const [form] = Form.useForm()
  const showModal = async arg => {
    if (arg.event) {
      try {
        setEventId(arg.event.id)
        const res = await calendarApi.getDetailEvent(arg.event.id)
        form.setFieldsValue({
          id: res.data.id,
          title: res.data.title,
          start_time: moment(res.data.start),
          end_time: moment(res.data.end),
          priority: res.data.priority,
          address: res.data.address,
          user_assigned: res.data.users_assign
            .filter(obj => obj.id !== user.id)
            .map(obj => obj.id),
        })
        if (res.data.user_id !== user.id) {
          setDisabled(true)
        } else {
          setDisabled(false)
        }
      } catch (err) {
        openCustomNotificationWithIcon('error', err)
      }
      setEventEdit(true)
    } else {
      setDisabled(false)
    }
    setIsModalVisible(true)
  }

  const showTable = async () => {
    const res = await calendarApi.getEventsByUserOrder(user.id)
    setDataTable(
      res.data.events.map(row => ({
        title: row.title,
        start_date: row.start,
        end_date: row.end,
        priority: priorities.find(e => e.value == row.priority).name,
      })),
    )
    setIsModalTableVisible(true)
  }

  const handleCancelTable = () => {
    setIsModalTableVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const onSubmit = async values => {
    const data = {
      id: values.id,
      title: values.title,
      start:
        values.start_time && moment(values.start_time._d).format(dateFormat),
      end: values.end_time && moment(values.end_time._d).format(dateFormat),
      user_id: user.id,
      address: values.address,
      priority: values.priority,
      user_assigned: values.user_assigned,
    }
    if (eventEdit) {
      try {
        const response = await calendarApi.updateEvent(values.id, data)
        if (response.status === 200) {
          const updatedItem = events.map(todo => {
            return todo.id === values.id ? data : todo
          })
          setEvents(updatedItem)
          openCustomNotificationWithIcon('success', response.data.message)
        }
      } catch (err) {
        openCustomNotificationWithIcon('error', err)
      }
      setEventEdit(false)
    } else {
      try {
        const response = await calendarApi.addEvent(data)
        if (response.status === 200) {
          setEvents([...events, data])
          openCustomNotificationWithIcon('success', response.data.message)
        }
      } catch (err) {
        // openCustomNotificationWithIcon('error', Object.values(err.response.data.errors).flat())
        openCustomNotificationWithIcon('error', 'Error')
      }
    }
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleDelete = async () => {
    const id = form.getFieldValue('id')
    try {
      const response = await calendarApi.removeEvent(id)
      const updatedItem = events.filter(event => {
        return event.id !== id
      })
      setEvents(updatedItem)
      openCustomNotificationWithIcon('success', response.data.message)
    } catch (err) {
      openCustomNotificationWithIcon('error', err)
    }

    setIsModalVisible(false)
    form.resetFields()
  }

  useEffect(() => {
    if (user !== undefined) {
      const fetchEventList = async () => {
        try {
          const response = await calendarApi.getEventsByUser(user?.id)
          setEvents(response.data)
        } catch (err) {
          openCustomNotificationWithIcon('error', err)
        }
      }

      const fetchUserNotMe = async () => {
        try {
          const response = await userApi.getAllUserNotMe(user?.id)
          setUserAssigned(response.data)
        } catch (err) {
          openCustomNotificationWithIcon('error', err)
        }
      }

      fetchEventList()
      fetchUserNotMe()
    }
  }, [user])

  return (
    <AppLayout>
      <Head>
        <title>Calendar</title>
      </Head>
      <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 py-6">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="bg-white border-b border-gray-200">
            <div className="container mx-auto mb-8">
              <Button
                type="primary"
                onClick={showModal}
                size="large"
                className={
                  styles.button +
                  ' absolute border-solid border-2 rounded-sm top-10'
                }>
                Add Event
              </Button>
              <Button
                type="primary"
                onClick={showTable}
                size="large"
                className={
                  styles.button +
                  ' absolute border-solid border-2 rounded-sm top-10 ml-2'
                }>
                List Events
              </Button>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                titleFormat={{
                  year: 'numeric',
                  month: 'long',
                }}
                selectable={true}
                editable={true}
                events={events}
                headerToolbar={{
                  left: 'prev,next,today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                eventClick={showModal}
              />

              {/* Modal form */}
              <Modal
                title={eventEdit ? 'Edit Event' : 'New Event'}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Cancel
                  </Button>,
                  eventEdit && (
                    <Button
                      key="delete"
                      type="primary"
                      danger
                      onClick={handleDelete}
                      disabled={disabled}>
                      Delete
                    </Button>
                  ),
                  <Button
                    key="submit"
                    onClick={form.submit}
                    disabled={disabled}
                    type="primary">
                    Submit
                  </Button>,
                ]}>
                <Form
                  onFinish={onSubmit}
                  form={form}
                  disabled={disabled}
                  layout="horizontal"
                  labelCol={{
                    span: 5,
                  }}
                  wrapperCol={{
                    span: 20,
                  }}>
                  <Form.Item name="id" hidden={true}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="title"
                    label="Name"
                    rules={[
                      {
                        required: true,
                      },
                    ]}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="start_time"
                    label="Start Date"
                    rules={[
                      {
                        required: true,
                      },
                    ]}>
                    <DatePicker showTime />
                  </Form.Item>
                  <Form.Item name="end_time" label="End Date">
                    <DatePicker showTime />
                  </Form.Item>
                  <Form.Item
                    label="Priority"
                    name="priority"
                    rules={[
                      {
                        required: true,
                      },
                    ]}>
                    <Select placeholder="Please select priority">
                      {priorities.map((priority, index) => (
                        <Select.Option key={index} value={priority.value}>
                          {priority.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Assign" name="user_assigned">
                    <Select
                      placeholder="Please select people to assign"
                      mode="multiple">
                      {userAssigned.map((item, index) => (
                        <Select.Option key={index} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="address"
                    label="Address"
                    rules={[
                      {
                        required: true,
                      },
                    ]}>
                    <Input />
                  </Form.Item>
                </Form>
                <Button type="primary" href={`comment/${eventId}`}>
                  Comments
                </Button>
              </Modal>

              {/* Modal table */}
              <Modal
                visible={isModalTableVisible}
                onCancel={handleCancelTable}
                width={1000}
                footer={null}>
                <Table
                  dataSource={dataTable}
                  columns={columns}
                  className="mt-5"
                />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
