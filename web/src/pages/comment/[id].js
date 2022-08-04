import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Avatar, Button, Comment, Form, Input, Typography, Modal } from 'antd'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import calendarApi from '@/api/calendarApi'
import ExampleComment from '@/components/ExampleComment'
import createTree from '@/utils/treeComment'
import { useRouter } from 'next/router'
import { openCustomNotificationWithIcon } from '@/components/common/notification'

const { TextArea } = Input
const { Title } = Typography

export async function getServerSideProps(ctx) {
  const { params } = ctx
  const { id } = params
  const res = await calendarApi.getAllComments(id)
  return {
    props: {
      comments: res.data,
    },
  }
}

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
)

const CommentEvent = ctx => {
  const commentTree = createTree(ctx.comments.comments)
  const router = useRouter()
  const [value, setValue] = useState('')
  const [parentId, setParentId] = useState(null)

  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleSubmit = async () => {
    if (!value) return
    const data = {
      body: value,
      event_id: ctx.comments.id,
      parent_id: parseInt(parentId),
    }
    try {
      const response = await calendarApi.saveComment(data)
      if (response.status === 200) {
        openCustomNotificationWithIcon('success', response.data.message)
        router.reload()
      }
    } catch (err) {
      console.log(err)
    }

    setIsModalVisible(false)
  }

  const handleChange = e => {
    setValue(e.target.value)
  }

  return (
    <AppLayout>
      <Head>
        <title>Comments</title>
      </Head>
      <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 py-6">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="bg-white border-b border-gray-200">
            <div className="container mx-auto">
              <Title className="pl-4 pt-4">{ctx.comments.title}</Title>
              {commentTree.map(comment => (
                <ExampleComment
                  key={comment.id}
                  comment={comment}
                  showModal={showModal}
                  setParentId={setParentId}
                />
              ))}
              <Comment
                avatar={
                  <Avatar
                    src="https://joeschmoe.io/api/v1/random"
                    alt="Han Solo"
                  />
                }
                content={
                  <Editor
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    value={value}
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Add comment"
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}>
        <Form.Item>
          <TextArea value={value} onChange={handleChange} />
        </Form.Item>
      </Modal>
    </AppLayout>
  )
}

export default CommentEvent
