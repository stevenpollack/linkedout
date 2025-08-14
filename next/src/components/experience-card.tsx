"use client";

import { Gem } from "lucide-react";
import Experience from "../content/frank-voltaire/experience.json";
import { format, formatDuration, interval, intervalToDuration } from "date-fns";

function SkillsSection(props: { skills: string[]; modalId: string }) {
  const { skills, modalId } = props;

  const onClickHandler = () => {
    return (document.getElementById(modalId) as HTMLDialogElement)?.showModal();
  };
  function truncatedSkills(strs: string[]) {
    const skills = [...strs];
    let textLength = 0;
    let output = [];
    while (textLength <= 100) {
      if (skills.length === 0) {
        break;
      }
      output.push(skills.shift());
      textLength = output.join(", ").length;
    }
    if (skills.length !== 0) {
      const remainingSkills = skills.length;
      return `${output.join(", ")} and +${remainingSkills} skill${remainingSkills > 1 ? "s" : ""}`;
    } else {
      const lastSkill = output.pop();
      return `${output.join(", ")} and ${lastSkill}`;
    }
  }
  return (
    <>
      <button className="btn btn-link" onClick={onClickHandler}>
        <div className="flex flex-row items-baseline">
          <Gem className="h-3" />
          <div>{truncatedSkills(skills)}</div>
        </div>
      </button>
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm">
              ✕
            </button>
          </form>
          <h3 className="text-lg font-bold">Skills</h3>
          <ul className="list">
            {skills.map((skill) => (
              <li key={skill} className="list-row">
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

function formatDates(startDate: string, endDate?: string) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : Date.now();
  const duration = interval(start, end);

  return `${format(start, "MMM yyyy")} -- ${endDate ? format(end, "MMM yyyy") : "Present"} · ${formatDuration(intervalToDuration(duration), { format: ["years", "months"] })}`;
}

export function ExperienceCard() {
  return (
    <div className="card-border card">
      <div className="card-body">
        <h2 className="card-title">Experience</h2>
        <ul className="list">
          {Experience.map((experience) => (
            <li key={experience.company} className="list-row">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-md font-bold">{experience.title}</span>
                  <span className="font-base">
                    {experience.company} · {experience.type}
                  </span>
                  <span className="text-gray-500">
                    {formatDates(experience.startDate, experience.endDate)}
                  </span>
                  <span className="text-gray-500">
                    {experience.location} · {experience.locationType}
                  </span>
                </div>
                <div>{experience.description}</div>
                <SkillsSection
                  skills={experience.skills}
                  modalId={experience.company}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
