package com.irina.homework.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Task.
 */
@Entity
@Table(name = "task")
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "task_text")
    private String taskText;

    @Column(name = "assign_date")
    private LocalDate assignDate;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @ManyToOne
    @JsonIgnoreProperties("assineTasks")
    private Employee employee;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Employee creator;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTaskText() {
        return taskText;
    }

    public Task taskText(String taskText) {
        this.taskText = taskText;
        return this;
    }

    public void setTaskText(String taskText) {
        this.taskText = taskText;
    }

    public LocalDate getAssignDate() {
        return assignDate;
    }

    public Task assignDate(LocalDate assignDate) {
        this.assignDate = assignDate;
        return this;
    }

    public void setAssignDate(LocalDate assignDate) {
        this.assignDate = assignDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public Task dueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
        return this;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public Employee getEmployee() {
        return employee;
    }

    public Task employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Employee getCreator() {
        return creator;
    }

    public Task creator(Employee employee) {
        this.creator = employee;
        return this;
    }

    public void setCreator(Employee employee) {
        this.creator = employee;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Task task = (Task) o;
        if (task.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), task.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Task{" +
            "id=" + getId() +
            ", taskText='" + getTaskText() + "'" +
            ", assignDate='" + getAssignDate() + "'" +
            ", dueDate='" + getDueDate() + "'" +
            "}";
    }
}
