export const Text = () => {
  return (
    <div className="container-text w-100 d-flex justify-content-center">
      <div className="text col-xl-8 col-lg-8 col-md-9 col-sm-10">
        <div>
          <p className="title">Welcome to my first project!</p>
        </div>
        <div>
          <p className="text-body">
            You are now in an environment designed to facilitate task management
            in the style of Kanban. This system allows you to create projects
            and assign tasks to each one, providing effective control and
            efficient management of the timelines associated with each project.
          </p>
        </div>
        <div>
          <p className="text-body">
            Within this platform, you can organize your tasks based on their
            priority and deadlines, allowing you to visualize and prioritize
            work intuitively. The combination of technologies used ensures a
            robust and effective experience:
          </p>
        </div>
        <div className="text-body container-list">
          <div className="text-body row">
            <p>Frontend</p>
            <ul>
              <li>React</li>
              <li>TypeScript</li>
              <li>SWC</li>
            </ul>
          </div>
          <div className="text-body row">
            <p>Backend</p>
            <ul>
              <li>ExpressJs</li>
              <li>TypeScript</li>
              <li>MongoDB</li>
            </ul>
          </div>
        </div>
        <div>
          <p className="text-body">
            These technologies work together to provide you with a modern and
            efficient application that will make the management of your projects
            and tasks smoother and more productive. We hope you enjoy using this
            tool to optimize your organization and productivity!
          </p>
        </div>
      </div>
    </div>
  )
}
