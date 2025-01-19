import React, { ReactNode } from "react"
import { Meta, StoryFn } from "@storybook/react"
import Table from "./table"
import { exampleJobList } from "@/app/mock/job"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import tableReducer from "@/app/lib/tableSlice"

const header = [
  {
    displayLabel: "job id",
    label: "jobId",
  },
  {
    displayLabel: "status",
    label: "status",
  },
  {
    displayLabel: "created at",
    label: "createdAt",
  },
  {
    displayLabel: "update at",
    label: "updatedAt",
  },
  {
    displayLabel: "template",
    label: "template",
  },
  {
    displayLabel: "runner",
    label: "runner",
  },
]

const initialState = {
  item: exampleJobList,
  sortedItem: [],
  selectedItem: [],
  selectAll: false,
  currentPage: 1,
  itemsPerPage: 25,
}

interface MockstoreProps {
  children: ReactNode
  initialState: typeof initialState
}

const Mockstore: React.FC<MockstoreProps> = ({ children, initialState }) => {
  const mockStore = configureStore({
    reducer: {
      table: tableReducer,
    },
    preloadedState: {
      table: initialState,
    },
  })

  return <Provider store={mockStore}>{children}</Provider>
}

export default {
  title: "Table/Table",
  component: Table,
  tags: ["autodocs"],
  decorators: [
    (Story, context) => (
      <Mockstore initialState={context.args.initialState}>
        <Story />
      </Mockstore>
    ),
  ],
} as Meta<typeof Table>

const Template: StoryFn<typeof Table> = (args) => <Table {...args} />

export const Default = Template.bind({})
Default.args = {
  initialState: initialState,
  header: header,
  tableItem: exampleJobList,
  perPage: 25,
}

export const JobTable = Template.bind({})
JobTable.args = {
  initialState: initialState,
  header: header,
  tableItem: exampleJobList,
  perPage: 25,
}
