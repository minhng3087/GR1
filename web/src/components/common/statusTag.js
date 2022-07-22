import { Tag } from 'antd'

const statusMap = {
    Low: <Tag color="green">Low</Tag>,
    Medium: <Tag color="orange">Medium</Tag>,
    High: <Tag color="red">High</Tag>,
}

export const StatusTag = ({ status }) => statusMap[status]
