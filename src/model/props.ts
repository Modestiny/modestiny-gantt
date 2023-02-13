import { Task, TableProp } from "."

export interface GanttOption {
    
    /** 边框样式 */
    borderColor?: string

    /** 边框样式 */
    cellWidth: number

    /** 边框样式 */
    cellHeight: number

    /** 任务数据 */
    taskList: Task[]

    /** 表格配置 */
    tableProps: TableProp[]

}