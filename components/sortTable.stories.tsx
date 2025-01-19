import React from "react"
import { Meta, StoryFn } from "@storybook/react"
import SortTable from "./sortTable"
import store from "@/app/lib/store"
import { Provider } from "react-redux"

export default {
  component: SortTable,
  title: "SortTable",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as Meta<typeof SortTable>

const Template: StoryFn<typeof SortTable> = (args) => <SortTable {...args} />

const exampleJobs = [
  {
    jobId: "149a1528-aa47-4e00-a535-980e706ee938",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-02T00:00:00Z",
    status: "queued",
  },
  {
    jobId: "934bfbb4-69ec-499f-b7c8-40f42c36950c",
    createdAt: "2023-01-03T00:00:00Z",
    updatedAt: "2023-01-04T00:00:00Z",
    status: "success",
  },
  {
    jobId: "ac634970-68b2-4f35-a915-42da6268b513",
    createdAt: "2023-01-05T00:00:00Z",
    updatedAt: "2023-01-06T00:00:00Z",
    status: "canceled",
  },
  {
    jobId: "5e1d3bca-557e-449b-9482-23dab75e2762",
    createdAt: "2023-01-05T00:00:00Z",
    updatedAt: "2023-01-06T00:00:00Z",
    status: "failed",
  },
]

export const Default = Template.bind({})
Default.args = {
  jobs: exampleJobs,
  perPage: 25,
}

export const NoData = Template.bind({})
NoData.args = {
  jobs: [],
}
