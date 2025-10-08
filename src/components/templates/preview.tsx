/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassicTemplate } from "./classic";
import { MinimalTemplate } from "./minimal";
import { ModernTemplate } from "./modern";
import { ProfessionalTemplate } from "./professional";
import { CreativeTemplate } from "./creative";
import { MinimalDarkTemplate } from "./minimal-dark";
import { ExecutiveTemplate } from "./executive";
import { ColorfulTemplate } from "./colorful";

export type ResumeTemplateKey = 'classic' | 'minimal' | 'modern' | 'professional' | 'creative' | 'minimal-dark' | 'executive' | 'colorful';

const templateMap: Record<ResumeTemplateKey, (p:{data:any})=>JSX.Element> = {
  classic: ({data}) => <ClassicTemplate data={data} />,
  minimal: ({data}) => <MinimalTemplate data={data} />,
  modern: ({data}) => <ModernTemplate data={data} />,
  professional: ({data}) => <ProfessionalTemplate data={data} />,
  creative: ({data}) => <CreativeTemplate data={data} />,
  'minimal-dark': ({data}) => <MinimalDarkTemplate data={data} />,
  executive: ({data}) => <ExecutiveTemplate data={data} />,
  colorful: ({data}) => <ColorfulTemplate data={data} />,
};

export function ResumePreview({ data, template }:{ data:any, template: ResumeTemplateKey }){
  const Renderer = templateMap[template];
  
  if (!Renderer) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="text-center text-gray-500">
          Template "{template}" not found. Using default template.
        </div>
        <ModernTemplate data={data} />
      </div>
    );
  }
  
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <Renderer data={data} />
    </div>
  );
}