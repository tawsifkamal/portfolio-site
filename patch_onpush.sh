for file in src/app/project-section/project-card/project-card.component.ts src/app/work-experience-section/work-experience-card/work-experience-card.component.ts src/app/work-experience-section/work-experience-section.component.ts src/app/navigation/navigation.component.ts src/app/tag/tag.component.ts src/app/app.component.ts; do
  sed -i 's/import { Component/import { Component, ChangeDetectionStrategy /g' $file
  sed -i 's/styleUrl: .*,/&\n  changeDetection: ChangeDetectionStrategy.OnPush,/g' $file
done
