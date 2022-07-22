import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import styles from '@/components/Loading/style.module.scss'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

// Return value should be component
const Loading = () => <Spin indicator={antIcon} className={styles.loading} />

export default Loading
