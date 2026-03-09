"use client";
import React, { useState, useEffect } from 'react';
import { tierData, TierItem } from '@/data/tierData';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragOverEvent,
    DragStartEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    horizontalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

type TierListModalProps = {
    isOpen: boolean;
    onClose: () => void;
    category: string;
    currentItemName: string;
};

const tierColors = {
    S: "bg-[#FF7F7F]",
    A: "bg-[#FFBF7F]",
    B: "bg-[#FFDF7F]",
    C: "bg-[#FFFF7F]",
    D: "bg-[#BEFF7F]"
};

const tiersArr: (keyof typeof tierColors)[] = ['S', 'A', 'B', 'C', 'D'];

// Sortable Item Component
function SortableItem({ id, item, isCurrent }: { id: string, item: TierItem, isCurrent: boolean }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`px-4 py-2 rounded text-xs font-bold transition-all border cursor-grab active:cursor-grabbing ${isCurrent
                    ? "bg-white text-black border-white shadow-lg shadow-white/20 scale-105"
                    : "bg-[#252525] text-gray-300 border-white/5 hover:border-white/20"
                }`}
            title={item.description}
        >
            {item.name}
            {isCurrent && <span className="ml-2 text-[10px] uppercase">Selected</span>}
        </div>
    );
}

export default function TierListModal({ isOpen, onClose, category, currentItemName }: TierListModalProps) {
    const [itemsByTier, setItemsByTier] = useState<Record<string, (TierItem & { id: string })[]>>({});

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        if (isOpen) {
            const data = tierData.find(d => d.category === category);
            if (data) {
                const initial: Record<string, (TierItem & { id: string })[]> = {};
                tiersArr.forEach(t => {
                    initial[t] = data.tiers[t].map(item => ({ ...item, id: `${t}-${item.name}` }));
                });
                setItemsByTier(initial);
            }
        }
    }, [isOpen, category]);

    if (!isOpen) return null;

    const data = tierData.find(d => d.category === category);

    if (!data) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
                <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                    <h3 className="text-xl font-bold mb-4">No Data Available</h3>
                    <p className="text-gray-500 mb-6">We don't have tier data for the "{category}" category yet.</p>
                    <button onClick={onClose} className="w-full bg-black text-white py-3 rounded-xl font-bold">Close</button>
                </div>
            </div>
        );
    }

    const findContainer = (id: string) => {
        if (id in itemsByTier) return id;
        return Object.keys(itemsByTier).find((key) => itemsByTier[key].find((item) => item.id === id));
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        const activeContainer = findContainer(activeId);
        const overContainer = findContainer(overId);

        if (!activeContainer || !overContainer || activeContainer === overContainer) {
            return;
        }

        setItemsByTier((prev) => {
            const activeItems = prev[activeContainer];
            const overItems = prev[overContainer];

            const activeIndex = activeItems.findIndex((item) => item.id === activeId);
            const overIndex = overItems.findIndex((item) => item.id === overId);

            let newIndex;
            if (overId in prev) {
                newIndex = overItems.length + 1;
            } else {
                const isBelowLastItem = over && overIndex === overItems.length - 1;
                const modifier = isBelowLastItem ? 1 : 0;
                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            return {
                ...prev,
                [activeContainer]: [...prev[activeContainer].filter((item) => item.id !== activeId)],
                [overContainer]: [
                    ...prev[overContainer].slice(0, newIndex),
                    itemsByTier[activeContainer][activeIndex],
                    ...prev[overContainer].slice(newIndex, prev[overContainer].length)
                ]
            };
        });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        const activeContainer = findContainer(activeId);
        const overContainer = findContainer(overId);

        if (!activeContainer || !overContainer || activeContainer !== overContainer) {
            return;
        }

        const activeIndex = itemsByTier[activeContainer].findIndex((item) => item.id === activeId);
        const overIndex = itemsByTier[overContainer].findIndex((item) => item.id === overId);

        if (activeIndex !== overIndex) {
            setItemsByTier((items) => ({
                ...items,
                [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
            }));
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-[#1A1A1A] rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl border border-white/10">
                <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-[#252525]">
                    <div>
                        <h3 className="text-xl font-bold text-white">{category} Tier List</h3>
                        <p className="text-xs text-gray-400 mt-1">Comparing: <span className="text-primary-light font-bold">{currentItemName}</span></p>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-1 bg-black overflow-y-auto max-h-[70vh]">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragOver={handleDragOver}
                        onDragEnd={handleDragEnd}
                        modifiers={[restrictToWindowEdges]}
                    >
                        {tiersArr.map((tier) => (
                            <div key={tier} className="flex min-h-[80px] bg-[#1A1A1A] group">
                                <div className={`${tierColors[tier]} w-24 flex items-center justify-center text-2xl font-black text-black/80 flex-shrink-0`}>
                                    {tier}
                                </div>
                                <div className="flex-1 p-3">
                                    <SortableContext
                                        id={tier}
                                        items={itemsByTier[tier] || []}
                                        strategy={horizontalListSortingStrategy}
                                    >
                                        <div className="flex flex-wrap gap-2 items-center content-center min-h-[56px] w-full">
                                            {(itemsByTier[tier] || []).map((item) => {
                                                const isCurrent = currentItemName.toLowerCase().includes(item.name.toLowerCase()) ||
                                                    item.name.toLowerCase().includes(currentItemName.toLowerCase());

                                                return (
                                                    <SortableItem key={item.id} id={item.id} item={item} isCurrent={isCurrent} />
                                                );
                                            })}
                                            {(!itemsByTier[tier] || itemsByTier[tier].length === 0) && (
                                                <div className="w-full h-full min-h-[40px] border-2 border-dashed border-white/5 rounded flex items-center justify-center text-white/5 uppercase text-[10px] font-bold">
                                                    Drop here
                                                </div>
                                            )}
                                        </div>
                                    </SortableContext>
                                </div>
                            </div>
                        ))}
                    </DndContext>
                </div>
            </div>
        </div>
    );
}
