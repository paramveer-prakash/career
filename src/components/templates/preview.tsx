/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassicTemplate } from "./classic";
import { MinimalTemplate } from "./minimal";
import { ModernTemplate } from "./modern";

export type ResumeTemplateKey = 'classic' | 'minimal' | 'modern';

const templateMap: Record<ResumeTemplateKey, (p:{data:any})=>JSX.Element> = {
  classic: ({data}) => <ClassicTemplate data={data} />,
  minimal: ({data}) => <MinimalTemplate data={data} />,
  modern: ({data}) => <ModernTemplate data={data} />,
};

export function ResumePreview({ data, template }:{ data:any, template: ResumeTemplateKey }){
  const Renderer = templateMap[template];
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <Renderer data={data} />
    </div>
  );
}


