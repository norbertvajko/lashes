interface HeaderProps {
  title: string;
  label: string;
}

export const Header = (props: HeaderProps) => {
  const { title, label } = props;

  return (
    <div className="w-full flex flex-col gap-y-4 items-center">
      <h1 className={'text-3xl font-semibold'}>{title}</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
