import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CommonCard({
  description,
  title,
  icon,
  footerContent,
}) {
  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="p-4 border-b border-gray-200">
        {icon ? <div className="mb-3">{icon}</div> : null}

        {title ? (
          <CardTitle className="text-xl font-semibold text-gray-800">
            {title}
          </CardTitle>
        ) : null}

        {description ? (
          <CardDescription className="text-sm text-gray-500 mt-2">
            {description}
          </CardDescription>
        ) : null}
      </CardHeader>

      <CardFooter className="p-4 border-t border-gray-200 bg-gray-50">
        <p className="text-sm text-gray-600">{footerContent}</p>
      </CardFooter>
    </Card>
  );
}
