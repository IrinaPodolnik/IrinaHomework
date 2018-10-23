package com.irina.homework.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Employee.
 */
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="EmployeeType")
@DiscriminatorValue("Employee")
@Table(name = "employee")
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "position")
    private String position;

    @ManyToOne
    @JsonIgnoreProperties("subordinates")
    private Employee manager;

    @OneToMany(mappedBy = "employee")
    private Set<Task> assineTasks = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Employee firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Employee lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPosition() {
        return position;
    }

    public Employee position(String position) {
        this.position = position;
        return this;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Employee getManager() {
        return manager;
    }

    public Employee employee(Manager manager) {
        this.manager = manager;
        return this;
    }

    public void setManager(Manager manager) {
        this.manager = manager;
    }



    public Set<Task> getAssineTasks() {
        return assineTasks;
    }

    public Employee assineTasks(Set<Task> tasks) {
        this.assineTasks = tasks;
        return this;
    }

    public Employee addAssineTasks(Task task) {
        this.assineTasks.add(task);
        task.setEmployee(this);
        return this;
    }

    public Employee removeAssineTasks(Task task) {
        this.assineTasks.remove(task);
        task.setEmployee(null);
        return this;
    }

    public void setAssineTasks(Set<Task> tasks) {
        this.assineTasks = tasks;
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
        Employee employee = (Employee) o;
        if (employee.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), employee.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Employee{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", position='" + getPosition() + "'" +
            "}";
    }
}
