/**
 * @file Settings.tsx - ./frontend/src/components
 * @description A component for managing application settings, including projects list, per diem rates, and mileage rates, with admin-level access for editing.
 *              It fetches settings from the server and allows updates to be saved.
 * @author matthewb
 * @date Created: 2024-10-01 | Last Modified: 2024-10-02
 * @version 1.0.0
 * @license MIT
 * @usage This component is used to display and modify application settings related to expenses, including per diem rates and mileage rates.
 *        Admin-level access is required for editing these settings. The component integrates with a settings service for data fetching and updates.
 * @dependencies
 *  - react: ^18.0.0 // React library for building user interfaces
 *  - ../services/settingsService: settingsService // Service for managing settings-related API calls
 *  - ../data/types: SettingsType // Type definition for settings data
 *  - ./Configurable: Configurable // Child component for rendering editable settings fields
 * @relatedFiles
 *  - Configurable.tsx: ./Configurable // Child component for configuring individual settings, ./ConfigurableProject
 */

import { useEffect, useState } from 'react'
import settingsService from '../../services/settingsService'
import {
  CostCodeDropdownType,
  ProjectDropdownType,
  SettingsType,
} from '../../data/types'
import Loading from '../Loading'
import Configurable from './Configurable'
import ConfigurableProject from './ConfigurableProject'
import ConfigurableCostCode from './ConfigurableCostCode'
import Body from '../Body'
import { Header, Subtitle, Title } from '../Text'
import Container from '../Container'
import Button from '../Button'

const Settings = () => {
  const [settings, setSettings] = useState<SettingsType>()
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const [addingProject, setAddingProject] = useState<boolean>(false)
  const [newProject, setNewProject] = useState<ProjectDropdownType>({
    number: 0,
    name: '',
  })
  const [addingCostCode, setAddingCostCode] = useState<boolean>(false)
  const [newCostCode, setNewCostCode] = useState<CostCodeDropdownType>({
    costCode: '',
    category: '',
  })

  useEffect(() => {
    settingsService
      .get()
      .then((response) => {
        setSettings(response)
      })
      .catch((error: unknown) => {
        console.log(error)
      })
  }, [])

  const handleSave = () => {
    if (!settings) return

    settingsService
      .set(settings)
      .then(() => {
        alert('Settings updated successfully!')
      })
      .catch((error: unknown) => {
        console.log(error)
        alert('Failed to update settings.')
      })
  }

  const handleMileageRateChange = (newMileageRate: number) => {
    if (!settings) return
    const updatedSettings = {
      ...settings,
      mileageRate: newMileageRate,
    }
    setSettings(updatedSettings)
  }

  const handlePerDiemChange = (key: string, newValue: number) => {
    if (!settings) return
    const updatedSettings = {
      ...settings,
      perDiem: {
        ...settings.perDiem,
        [key]: newValue,
      },
    }
    setSettings(updatedSettings)
  }

  // Projects List
  const handleProjectChange = (updatedProject: ProjectDropdownType) => {
    if (!settings) return

    const updatedProjects: ProjectDropdownType[] = settings.projects.map(
      (project) =>
        project.name === updatedProject.name ? updatedProject : project
    )

    handleProjectsChange(updatedProjects)
  }

  const handleProjectsChange = (updatedProjects: ProjectDropdownType[]) => {
    if (!settings) return

    const updatedSettings = {
      ...settings,
      projects: updatedProjects,
    }

    setSettings(updatedSettings)
  }

  const handleDeleteProject = (projectToDelete: ProjectDropdownType) => {
    if (!settings) return

    if (
      !window.confirm(
        `Are you sure you want to delete ${projectToDelete.number.toString()} - ${
          projectToDelete.name
        }?`
      )
    )
      return

    const updatedProjects = settings.projects.filter(
      (project) => project !== projectToDelete
    )

    handleProjectsChange(updatedProjects)
  }

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedProject: ProjectDropdownType = {
      ...newProject,
      number: Number(event.target.value),
    }
    setNewProject(updatedProject)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedProject: ProjectDropdownType = {
      ...newProject,
      name: event.target.value,
    }
    setNewProject(updatedProject)
  }

  const handleAddProject = () => {
    if (!settings) return

    const updatedSettings = {
      ...settings,
      projects: settings.projects.concat(newProject),
    }

    setNewProject({
      number: 0,
      name: '',
    })
    setSettings(updatedSettings)
  }

  // Cost Codes list
  const handleCostCodeChange = (updatedCostCode: CostCodeDropdownType) => {
    if (!settings) return

    const updatedCostCodes: CostCodeDropdownType[] = settings.costCodes.map(
      (costCode) =>
        costCode.category === updatedCostCode.category
          ? updatedCostCode
          : costCode
    )

    handleCostCodesChange(updatedCostCodes)
  }

  const handleCostCodesChange = (updatedCostCodes: CostCodeDropdownType[]) => {
    if (!settings) return

    const updatedSettings = {
      ...settings,
      costCodes: updatedCostCodes,
    }

    setSettings(updatedSettings)
  }

  const handleDeleteCostCode = (costCodeToDelete: CostCodeDropdownType) => {
    if (!settings) return

    if (
      !window.confirm(
        `Are you sure you want to delete ${costCodeToDelete.costCode} ${costCodeToDelete.category}?`
      )
    )
      return

    const updatedCostCodes = settings.costCodes.filter(
      (costCode) => costCode !== costCodeToDelete
    )

    handleCostCodesChange(updatedCostCodes)
  }

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCostCode: CostCodeDropdownType = {
      ...newCostCode,
      costCode: event.target.value,
    }
    setNewCostCode(updatedCostCode)
  }

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCostCode: CostCodeDropdownType = {
      ...newCostCode,
      category: event.target.value,
    }
    setNewCostCode(updatedCostCode)
  }

  const handleAddCostCode = () => {
    if (!settings) return

    const updatedSettings = {
      ...settings,
      costCodes: settings.costCodes.concat(newCostCode),
    }

    setNewCostCode({
      costCode: '',
      category: '',
    })
    setSettings(updatedSettings)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === import.meta.env.VITE_ATEC_ADMIN_PASSWORD)
      setIsAdmin(true)
  }

  if (!settings) return <Loading />

  return (
    <Body>
      <div className="w-full flex flex-col space-y-8">
        {!isAdmin && (
          <Container>
            <Title text="Admin Password" />
            <Subtitle text="Enter the administation password to enable editing" />
            <input
              className="p-2 w-full border-grey-300 border-b-2"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                handlePasswordChange(e)
              }}
            />
          </Container>
        )}

        <div className="w-full flex flex-col space-y-8 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:space-y-0">
          <div className="flex flex-col space-y-8">
            {/*Projects*/}
            <div className="flex flex-col space-y-4">
              <Title text="Projects" />
              <Container>
                <div className="w-full flex flex-col max-h-96 flex-grow space-y-8 overflow-y-auto items-start pr-4">
                  {settings.projects.map((project) => (
                    <ConfigurableProject
                      key={project.name}
                      project={project}
                      isAdmin={isAdmin}
                      onChange={handleProjectChange}
                      handleDeleteProject={handleDeleteProject}
                    />
                  ))}
                </div>

                {isAdmin && (
                  <div>
                    <Header text="New Project" />
                    <div className="w-full grid grid-cols-[1fr_1fr_1fr] gap-x-4">
                      <input
                        className="py-2 w-full border-grey-300 border-b-2"
                        type="text"
                        placeholder="Project number"
                        value={
                          newProject.number === 0
                            ? undefined
                            : newProject.number
                        }
                        onChange={handleNumberChange}
                      />
                      <input
                        className="py-2 w-full border-grey-300 border-b-2"
                        type="text"
                        placeholder="Project name"
                        value={newProject.name}
                        onChange={handleNameChange}
                      />
                      <Button
                        text="Add"
                        onClick={() => {
                          handleAddProject()
                          setAddingProject(!addingProject)
                        }}
                      />
                    </div>
                  </div>
                )}
              </Container>
            </div>

            {/*Per Diem*/}
            <div className="w-full flex flex-col space-y-4">
              <Title text="Per Diem" />
              <Container>
                <Configurable
                  name="Breakfast"
                  value={settings.perDiem.breakfast}
                  isAdmin={isAdmin}
                  onChange={(newValue) => {
                    handlePerDiemChange('breakfast', newValue)
                  }}
                />
                <Configurable
                  name="Lunch"
                  isAdmin={isAdmin}
                  value={settings.perDiem.lunch}
                  onChange={(newValue) => {
                    handlePerDiemChange('lunch', newValue)
                  }}
                />
                <Configurable
                  name="Dinner"
                  isAdmin={isAdmin}
                  value={settings.perDiem.dinner}
                  onChange={(newValue) => {
                    handlePerDiemChange('dinner', newValue)
                  }}
                />
              </Container>
            </div>
          </div>

          <div className="flex flex-col space-y-8">
            {/*Cost Codes*/}
            <div className="flex flex-col space-y-4">
              <Title text="Cost Codes" />
              <Container>
                <div className="w-full flex flex-col max-h-96 space-y-8 overflow-y-auto items-start pr-4">
                  {settings.costCodes.map((costCode) => (
                    <ConfigurableCostCode
                      key={costCode.category}
                      costCode={costCode}
                      isAdmin={isAdmin}
                      onChange={handleCostCodeChange}
                      handleDeleteCostCode={handleDeleteCostCode}
                    />
                  ))}
                </div>
                {isAdmin && (
                  <div>
                    <Header text="New Cost Code" />
                    <div className="w-full grid grid-cols-[1fr_1fr_1fr] gap-x-4">
                      <input
                        className="py-2 w-full border-grey-300 border-b-2"
                        type="text"
                        placeholder="Cost code"
                        value={newCostCode.costCode}
                        onChange={handleCodeChange}
                      />
                      <input
                        className="py-2 w-full border-grey-300 border-b-2"
                        type="text"
                        placeholder="Category"
                        value={newCostCode.category}
                        onChange={handleCategoryChange}
                      />
                      <Button
                        text="Add"
                        onClick={() => {
                          handleAddCostCode()
                          setAddingCostCode(!addingCostCode)
                        }}
                      />
                    </div>
                  </div>
                )}
              </Container>
            </div>

            {/*Mileage*/}
            <div className="w-full flex flex-col space-y-4">
              <Title text="Mileage" />
              <Container>
                <Configurable
                  name="Mileage Rate"
                  isAdmin={isAdmin}
                  value={settings.mileageRate}
                  onChange={(newValue) => {
                    handleMileageRateChange(newValue)
                  }}
                />
              </Container>
            </div>
          </div>
        </div>
        {isAdmin && (
          <div className="self-center">
            <Button text="Save changes" onClick={handleSave} />
          </div>
        )}
      </div>
    </Body>
  )
}

export default Settings
