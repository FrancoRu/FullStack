import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../../component/Input";
import { Button } from "../../component/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth.Context";
import { useEffect } from "react";
import { useError } from "../../context/error/useError.Context";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

interface FormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { errors: LoginError } = useError();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { sigIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/project");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    sigIn(data);
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <section className="col-xl-4 col-lg-6 col-md-8 col-sm-10">
        <div>
          <Form noValidate onSubmit={handleSubmit(onSubmit)} className="col-12">
            {LoginError?.map((msg, index) => (
              <Alert key={index} variant="danger">
                {msg}
              </Alert>
            ))}
            {/* <Row className="mb-3"> */}
            <Form.Label hidden>Enter your email:</Form.Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              register={register}
            />
            {errors.email && <p> {errors.email.message}</p>}
            {/* </Row> */}
            {/* <Row className="mb-3"> */}
            <Form.Label hidden>Enter your password:</Form.Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              minLength={6}
              maxLength={30}
              register={register}
            />
            {errors.password && <p> {errors.password.message}</p>}
            {/* </Row> */}

            {/* <Row className="mb-3 d-flex justify-content-center"> */}
            <div className="container-button">
              <Button
                type="submit"
                value="Log In"
                variant="outline-light"
                classname="col-lg-3 col-md-5 col-sm-7"
              />
            </div>
            {/* </Row> */}
            {/* <Row> */}
            <p className="text-access">
              You do not have an account? <Link to="/register">Sign up</Link>
            </p>
            {/* </Row> */}
          </Form>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
