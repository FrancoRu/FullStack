import { Bar } from 'react-chartjs-2'
import { useProject } from '../../context/project/useProject.Context'
import { useTask } from '../../context/task/useTask.Context'
import { numbers } from '../../libs/number'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js/auto'
import Card from 'react-bootstrap/Card'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useState } from 'react'
import { Button } from '../../component/Button'

function Panel() {
  const { projects } = useProject()
  const { tasks } = useTask()

  const numProject = numbers(projects)
  const numTask = numbers(tasks)
  ChartJS.register(ArcElement, Tooltip, Legend)

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button
        type="submit"
        variant="outline-success"
        handler={handleShow}
        value="panel"
      />
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Panel</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Card>
            <Bar
              data={{
                labels: ['projects'],
                datasets: [
                  {
                    label: 'Total',
                    data: [numProject.number]
                  },
                  {
                    label: 'Complete',
                    data: [numProject.numberCompleted]
                  },
                  {
                    label: 'In Progress',
                    data: [numProject.numberStarted]
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </Card>
          <Card>
            <Bar
              data={{
                labels: ['tasks'],
                datasets: [
                  {
                    label: 'Total',
                    data: [numTask.number]
                  },
                  {
                    label: 'Complete',
                    data: [numTask.numberCompleted]
                  },
                  {
                    label: 'In Progress',
                    data: [numTask.numberStarted]
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </Card>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Panel
