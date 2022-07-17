import React, { useState, useEffect } from 'react'
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import "@fullcalendar/common/main.css"
import "@fullcalendar/daygrid/main.css"
import "@fullcalendar/timegrid/main.css"
import { Modal, DatePicker, Form, Input, Button, Select} from 'antd'
import moment from 'moment'
import { openCustomNotificationWithIcon } from '@/components/common/notification'
import calendarApi from '@/api/calendarApi'
import styles from '@/components/Calendar/style.module.scss'
import { StatusTag } from '@/components/common/statusTag'
import { Sorter } from '@/utils/sorter'
import  Table from '@/components/Table'

const Calendar = ({user}) => {
  
  const [events, setEvents] = useState([])
  const [dataTable, setDataTable] = useState([])
  const [eventEdit, setEventEdit] = useState(false)

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalTableVisible, setIsModalTableVisible] = useState(false)

  const dateFormat = 'YYYY-MM-DD HH:mm:ss'

  const priorities = [
    { value: 1, name: 'Low'},
    { value: 2, name: 'Medium'},
    { value: 3, name: 'High'},
  ]

  const filterPriorities = [
    { text: 'Low', value: 'Low'},
    { text: 'Medium', value: 'Medium'},
    { text: 'High', value: 'High'},
  ]

  const columns = [
    {
        title:'Title',
        dataIndex:'title',
        sorter: {
          compare: Sorter.NAME,
        },
        selectInput: true
    },
    {
        title:'Start Date',
        dataIndex:'start_date',
        sorter: {
          compare: Sorter.DATE
        }
    },
    {
      title:'End Date',
      dataIndex:'end_date',
      sorter: {
        compare: Sorter.DATE
      }
    },
    {
      title:'Priority',
      dataIndex:'priority',
      filters: filterPriorities,
      onFilter: (value, record) => record.priority.indexOf(value) === 0,
      render: (text, record) => <StatusTag status={record.priority} />
    }
  ]

  const [form] = Form.useForm()
  const showModal = async (arg) => {
    if(arg.event){
      try {
        const res = await calendarApi.getDetailEvent(arg.event.id)
        form.setFieldsValue({
          id: res.data.id,
          title: res.data.title,
          start_time: moment(res.data.start),
          end_time: moment(res.data.end),
          priority: priorities.find((e) => e.value == res.data.priority).name,
          address: res.data.address,
        })
      }catch (err) {
        console.error(err)
      }
      setEventEdit(true)
    }
    setIsModalVisible(true)
  }

  const showTable = async () => {
    const res = await calendarApi.getEventsByUserOrder(user.id)
    setDataTable(res.data.events.map(row => (
      {
        title: row.title,
        start_date: row.start,
        end_date: row.end,
        priority: priorities.find((e) => e.value == row.priority).name
      }
    )))
    setIsModalTableVisible(true)
  }

  const handleCancelTable = () => {
    setIsModalTableVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const onSubmit = async (values) => {
    const data = {
      title: values.title,
      start: values.start_time && moment(values.start_time._d).format(dateFormat),
      end: values.end_time && moment(values.end_time._d).format(dateFormat),
      user_id: user.id,
      address: values.address,
      priority: values.priority
    }
    if(eventEdit) {
      try {
        const response = await calendarApi.updateEvent(values.id, data)
        const updatedItem = events.map((todo) => {
          return todo.id === values.id ? data : todo
        })
        setEvents(updatedItem)
        openCustomNotificationWithIcon('success', response.data.message)
      }catch (err) {
        console.log(err)
      }
      setEventEdit(false)
    }else {
      try {
        const response = await calendarApi.addEvent(data)
        setEvents([...events, data])
        openCustomNotificationWithIcon('success', response.data.message)
      }catch (err) {
        console.log(err)
      }
    }
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleDelete = async () => {
    const id = form.getFieldValue('id')
    try {
      const response = await calendarApi.removeEvent(id)
      const updatedItem = events.filter((event) => {
        return event.id !== id
      })
      setEvents(updatedItem)
      openCustomNotificationWithIcon('success', response.data.message)
    }catch (err) {
      console.log(err)
    }

    setIsModalVisible(false)
    form.resetFields()
  }

  useEffect(() => {
    const fetchEventList = async () => {
      try {
        const response = await calendarApi.getEventsByUser(user.id)
        setEvents(response.data.events)
      }catch (err) {
        console.log(err)
      }
    }

    fetchEventList()
  }, [])

  return (
    <div className="container mx-auto">
        <Button type="primary" onClick={showModal} size="large" className={styles.button + ' absolute border-solid border-2 rounded-sm top-10'}>
          Add Event
        </Button>
        <Button type="primary" onClick={showTable} size="large" className={styles.button + ' absolute border-solid border-2 rounded-sm top-10 ml-2'}>
          List Events
        </Button>
      <FullCalendar
        plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
        ]}
        titleFormat={{ year: 'numeric', month: 'long' }}
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
          eventEdit && <Button key="submit" type="primary" danger onClick={handleDelete}>
            Delete
          </Button>,
          <Button
            onClick={form.submit}
            type="primary"
          >
            Submit
          </Button>,
        ]}
      >
        <Form 
          onFinish={onSubmit} 
          form={form}
          layout="horizontal"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 20,
          }}
        >
          <Form.Item
            name="id"
            hidden={true}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="start_time"
            label="Start Date"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker 
              showTime
            />
          </Form.Item>
          <Form.Item
            name="end_time"
            label="End Date"
          >
            <DatePicker 
              showTime 
            />
          </Form.Item>
          <Form.Item 
            label="Priority"
            name="priority"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Please select priority">
              {priorities.map((priority, index) => 
                (<Select.Option key={index} value={priority.value}>{priority.name}</Select.Option>)
              )}
            </Select>
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal table */}
      <Modal
        visible={isModalTableVisible} 
        onCancel={handleCancelTable}
        width={1000}
        footer={null}
      >
        <Table dataSource={dataTable} columns={columns} className="mt-5"/>
      </Modal>
    </div>
  )
}

export default Calendar