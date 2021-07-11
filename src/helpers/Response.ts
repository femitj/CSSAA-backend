interface errorResponseProps {
  res: any;
  status: boolean;
  code: number;
  reason: string;
  data: any;
}
export const Response = ({
  res,
  status,
  code,
  reason,
  data,
}: errorResponseProps) => {
  return res.status(code).json({ status, code, reason, data });
};
