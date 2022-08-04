import { Avatar, Comment } from 'antd'
import moment from 'moment'
import { useRef } from 'react'

const ExampleComment = ({ comment, showModal, setParentId }) => {
  const ref = useRef(null)
  const nestedComments = (comment.children || []).map(comment => {
    return (
      <ExampleComment
        key={comment.id}
        comment={comment}
        type="child"
        showModal={showModal}
        setParentId={setParentId}
      />
    )
  })

  const showModalForm = () => {
    showModal(true)
    setParentId(ref.current.id)
  }

  return (
    <Comment
      actions={[
        <span
          ref={ref}
          id={comment.id}
          key="comment-nested-reply-to"
          onClick={showModalForm}>
          Reply to
        </span>,
      ]}
      author={comment.user.name}
      avatar={
        <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      }
      content={comment.body}
      datetime={moment(comment.updated_at).fromNow()}>
      {nestedComments}
    </Comment>
  )
}

export default ExampleComment
